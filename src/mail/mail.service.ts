import got from "got";
import * as FormData from 'form-data';
import {CONFIG_OPTIONS} from "../common/common.constants";
import {Inject, Injectable} from '@nestjs/common';
import {EmailVar, MailModuleOptions} from "./mail.interfaces";

@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
    ) {
    }


    private async sendEmail(subject: string, templateName: string, emailVars: EmailVar[]) {
        const form = new FormData();
        form.append("from", `seungseok from SeokberEats <mailgun@${this.options.domain}>`)
        form.append("to", `b9327912@naver.com`)
        form.append("subject", subject);
        form.append('template', templateName)
        emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value))
        try {
            await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `api:${this.options.apiKey}`,
                    ).toString('base64')}`,
                },
                body: form
            })
        } catch (error) {
            console.log(error);
        }
    }


    sendVerificationEmail(email: string, code: string) {
        this.sendEmail("Verify Your Email", "verify-email",
            [
                {"key": 'code', "value": code},
                {"key": 'username', 'value': email}
            ]
        )
    }
}
