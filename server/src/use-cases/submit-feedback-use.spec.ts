import { SubmitFeedBackUseCase } from "./submit-feedback-use-case"

const createFeedBackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', ()=>{
    const submitFeedBack = new SubmitFeedBackUseCase(
        { create: createFeedBackSpy},
        { sendMail: sendMailSpy}
    )

    it('should be able to submit a feedback',async ()=> {
        await expect(submitFeedBack.execute({
            type:'BUG',
            comment: 'example comment',
            screenshot:'data:image/png:base64test.jpg'
        })).resolves.not.toThrow();

        expect(createFeedBackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type',async ()=> {
        await expect(submitFeedBack.execute({
            type:'',
            comment: 'example comment',
            screenshot:'data:image/png:base64test.jpg'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment',async ()=> {
        await expect(submitFeedBack.execute({
            type:'BUG',
            comment: '',
            screenshot:'data:image/png:base64test.jpg'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot',async ()=> {
        await expect(submitFeedBack.execute({
            type:'BUG',
            comment: 'example comment',
            screenshot:'test.jpg'
        })).rejects.toThrow();
    });
})