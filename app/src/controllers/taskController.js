const Task = require("../models/Task");
const User = require("../models/User");
const ejs = require("ejs");
const path = require("path");
const sendEmail = require("../services/email/nodemailer");
const decodeToken = require("../utils/jwt/decodeToken");

const taskController = {
    create: async (req, res) => {
        const task = new Task(req.body);

        const decodedToken = await decodeToken(req.header("Authorization").slice(7));
        const taskCreator = await User.findOne({id: decodedToken.id});

        task.contact = taskCreator.email;

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
        const userExists = task.pendingProposals.map(String).includes(user.id);

        if(userExists) {
            return res.status(422).send({"message" : "Task have already been proposed to this user"})
        }

        task.pendingProposals.push(user.id);
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
    },

    handleProposalResponse: async (req, res) => {
        // the body should have a taskId and an answer type (accepted or declined)
        const token = await decodeToken(req.header("Authorization").slice(7));
        const user = await User.findOne({id: token.id});
        const task = await Task.findOne({id: req.body.taskId});
        const { answer } = req.body;

        if(!(task.pendingProposals.includes(user.id))) {
            return res.status(422).send({"message": "User not in proposal list"})
        };

        let emailInfos = {
            to: task.contact,
            subject: ""
        };
        let responseMessage = "";

        if(answer === "declined") {
            const newProposalList = task.pendingProposals.filter(id => id !== user.id);
            task.pendingProposals = newProposalList;
            emailInfos.subject = `Proposal ${task.name} has been declined`
            responseMessage = "Proposal declined"
        }

        if(answer === "accepted") {
            task.pendingProposals = []
            task.acceptedProposal = user.id;
            task.status = "ACCEPTED";
            emailInfos.subject = `Proposal ${task.name} has been accepted`;
            responseMessage = "Proposal accepted"
        }

        const template = await ejs.renderFile(path.resolve(__dirname, '../services/email/templates/proposalResponse.ejs'), {
            username: `${user.firstName} ${user.lastName}`,
            answer: `${answer}`,
            taskname: `${task.name}`
        });
        
        sendEmail(emailInfos, template);

        await task.save();

        return res.status(200).send({"message": responseMessage});
    },
    getOne: async (req, res) => {
        const task = await Task.findOne({id: req.body.id}).populate('pending');

        res.status(200).send(task);
    }

}

module.exports = taskController;
