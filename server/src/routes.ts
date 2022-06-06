import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedBacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedBackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks',async (req, res) => {
    const {type, comment, screenshot } = req.body;

    
    const prismaFeedBacksRepository = new PrismaFeedBacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedBackUseCase = new SubmitFeedBackUseCase(
        prismaFeedBacksRepository,
        nodemailerMailAdapter
    );
    
    await submitFeedBackUseCase.execute({
        type,
        comment,
        screenshot
    });

    return res.status(201).send()
}) 

