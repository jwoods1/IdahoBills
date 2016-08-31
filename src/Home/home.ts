import {HttpClient} from 'aurelia-http-client';
import {autoinject} from 'aurelia-framework';


@autoinject
export class Home{
    constructor(private http: HttpClient){

    }
bills = [];
loaded = false;
postComment(bill, comment){
   bill.comments.push(comment);
}

getBills(){
this.http.get('https://openstates.org/api/v1/bills/?state=id&apikey=bcc2a830883c4f459dbffe94b2a3e90f')
  .then(data => {
    this.bills = JSON.parse(data.response);
    this.bills.forEach(i => {
        i.comments = [];
    });
    this.loaded = true;
  });
}

activate(params, routeConfig, $navigationInstruction) {
    this.getBills();
}
    
}