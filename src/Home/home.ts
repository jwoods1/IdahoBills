import {HttpClient} from 'aurelia-http-client';
import {autoinject} from 'aurelia-framework';


@autoinject
export class Home{
    constructor(private http: HttpClient){

    }
bills = [];
loaded = false;
postComment(bill, comment){
   bill.comments = [];
   bill.comments.push(comment);
}

getBills(){
this.http.get('https://openstates.org/api/v1/bills/?state=id&search_window=session:2016&page&per_page=10&apikey=bcc2a830883c4f459dbffe94b2a3e90f')
  .then(data => {
    this.bills = JSON.parse(data.response);
    sessionStorage.setItem('bill', data.response);
    this.loaded = true;
  });
}

activate(params, routeConfig, $navigationInstruction) {
    let billStorage = sessionStorage.getItem('bill');
    console.log(billStorage);
    if(billStorage == null){
        this.getBills();
    }else{
       this.bills =  JSON.parse(billStorage);
       this.loaded = true;
    }

}
    
}