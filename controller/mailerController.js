import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

let date 
let orderDetails = {}
  
let emailConfig = {
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'stenin.bbf@gmail.com',
        pass:'ebwj rhjo ldcs obbb',
    },
}


let sender = 'xavier@bbf-bike.de';

class MailController{
   static async htmlToPdfMail(){
    try {
      const filename = fileURLToPath(import.meta.url);
      const dir = path.dirname(filename);
      ejs.renderFile(path.join(dir,'./mailTemplate.ejs'),{data:orderDetails,date: date},async(err,template)=>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(template, {waitUntil: 'networkidle0'})
        await page.pdf({
          path: path.dirname('../temp/Rechnung.pdf'),
          printBackground: true,
          format: 'A4',
        })
        await browser.close();
        let message = {
          from: sender, 
          to: orderDetails.email,
          subject: 'Vielen Dank für Ihren Kauf',
          html:template,
          attachments: [
            {
                path: path.dirname('../temp/Rechnung.pdf'),
                filename: 'Bestätigung.pdf', 
                contentType: 'contentType'
            }],
          envelope: {
              from: `Stenin <${sender}>`,
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
  date = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
  orderDetails = req.body; 
    try{
      MailController.htmlToPdfMail().then(()=>{
       return res.status(200).json('Email sent successfully');
      });
    }
    catch(error){
       res.status(500).json({message:"mail sending failed"});
    }
}