const Task = require("../models/Task");
const User = require("../models/User");
const ejs = require("ejs");
const path = require("path");
const sendEmail = require("../services/email/nodemailer");
const decodeToken = require("../utils/jwt/decodeToken");

const taskController = {
    create: async (req, res) => {
        const task = new Task(req.body);

        await task.save();

        res.status(201).send({"message": "Task created"});
    },

    addProposal: async (req, res) => {
        const task = await Task.findOne({id: req.body.taskId});
        const user = await User.findOne({id: req.body.userId});
        
        // initializing array if not already done
        if(!task.pendingProposals) {
            task.pendingProposals = []
        }

        // checking max length
        if(task.pendingProposals.length > 2) {
            return res.status(422).send({"message": "3 proposals have already been sent"});
        }

        // checking user existence in current proposals
        const userExists = task.pendingProposals.map(String).includes(user._id.toString());

        if(userExists) {
            return res.status(422).send({"message" : "Task have already been proposed to this user"})
        }

        task.pendingProposals.push(user._id);
        task.status = 'PENDING PROPOSALS';
        await task.save();

        const emailInfos = {
            to: [user.email],
            subject: "New job offer !"
        };

        const company = await decodeToken(req.header("Authorization").slice(7));
        const company_user = await User.findOne({id: company.id});
        const template = await ejs.renderFile(path.resolve(__dirname, '../services/email/templates/newProposal.ejs'), {
            username: `${user.firstName} ${user.lastName}`,
            company: `${company_user.firstName} ${company_user.lastName} from ${company_user.company.socialReason}`,
            link: 'https://google.com'
        });
        
        sendEmail(emailInfos, template);

        res.status(200).send({"message": "Proposal sent to user"});
    }
}

module.exports = taskController;
