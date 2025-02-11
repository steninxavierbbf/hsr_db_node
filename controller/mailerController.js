import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const date = new Date().getDate();
const month = new Date().getMonth()
const year = new Date().getFullYear();
const timeHour = new Date().getUTCHours();
const timeMinute = new Date().getUTCMinutes();
const timeSec = new Date().getUTCSeconds();
let orderDetails = {}
let htmlTemplate
  
let emailConfig = {
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'stenin.bbf@gmail.com',
        pass:'ebwj rhjo ldcs obbb',
    },
}


let sender = 'stenin.bbf@gmail.com';

class MailController{
   static async htmlToPdfMail(){
    try {
      const filename = fileURLToPath(import.meta.url);
      const dir = path.dirname(filename);
      ejs.renderFile(path.join(dir,'./mailTemplate.ejs'),{data:orderDetails,date: `${("0" + date).slice(-2)}-${("0" + month).slice(-2)}-${year}`,time:`${("0" + timeHour).slice(-2)}:${("0" + timeMinute).slice(-2)}:${("0" + timeSec).slice(-2)}`},async(err,template)=>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(template, {waitUntil: 'domcontentloaded'})
        await page.pdf({
          path: path.dirname('../temp/Rechnung.pdf') ,
          printBackground: true,
          format: 'A4',
        })
        await browser.close()
        let message = {
          from: sender, 
          to: orderDetails.email,
          subject: 'Ihre Bestellung wurde erfolgreich platziert',
          html:template,
          attachments: [
            {
                path: path.dirname('../temp/Rechnung.pdf'),
                filename: 'Rechnung.pdf', 
                contentType: 'contentType'
            }],
          envelope: {
              from: `Valdevz <${sender}>`,
              to: `${orderDetails.email},<${orderDetails.email}>`
          }
        }
        this.mailSender(message);
        });
    } catch (error) {
      throw error;
    }
  }

    static async mailSender(data){
        let transporter = nodemailer.createTransport(emailConfig);
        transporter.verify((error)=>error? error : '');
        transporter.sendMail(data);
    }
}

export const createPdfAndEmail = async(req,res)=>{
  console.log(req.body.email)
  orderDetails = req.body; 
    try{
      MailController.htmlToPdfMail().then(()=>{
       return res.status(200).type('json').send('Email sent successfully');
      });
    }
    catch(error){
       res.status(500).json({message:"mail sending failed"});
    }
}