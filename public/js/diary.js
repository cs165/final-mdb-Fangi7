class Diary {
  constructor() {

    this.containerElement = document.querySelector('#container');
    this.dateElement = document.querySelector('#date');
    this.textElement = document.querySelector('#editblock');
    this.footerbtnElement = document.querySelector('#footerbtn');
    this.checkbtnElement = document.querySelector('#checkbtn');
    this.backbtnElement = document.querySelector('#backbtn');
    this.homebtnElement = document.querySelector('#homebtn');
    this.forwardbtnElement = document.querySelector('#forwardbtn');
    this.resultsDiv = document.querySelector('#results');
    
    this.editon = this.editon.bind(this);
    this.editoff = this.editoff.bind(this);
    this.newDiary = this.newDiary.bind(this);
    this.hide = this.hide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getFormatCode = this.getFormatCode.bind(this);
    this.dateExist = this.dateExist.bind(this);
    
    console.log(this.containerElement);
    //date
        const today = new Date();
        this.options = { month: 'long', day: 'numeric' };
        this.date = today.toLocaleDateString('en-US', this.options);
        this.dateElement.innerText = this.date;
        
    this.dateExist();
    
    this.daycont = 0;
    
    this.containerElement.addEventListener('click',this.editon);
    this.backbtnElement.addEventListener('click',this.newDiary);
    this.homebtnElement.addEventListener('click',this.newDiary);
    this.forwardbtnElement.addEventListener('click',this.newDiary);  
  
  }
  newDiary(event){
      
      console.log(event.target.id);
      console.log(this.date);
      //clear
      document.getElementById('editblock').value = '';
      this.resultsDiv.innerHTML = '';
      if(event.target.id == 'backbtn'){
          this.daycont = this.daycont - 1;
      }
      if(event.target.id == 'forwardbtn'){
          this.daycont = this.daycont + 1;
      }
      if(event.target.id == 'homebtn'){
          this.daycont = 0;
      }
      //set new date
      console.log(event.target.id);
      console.log(this.date);
      const newDay = new Date();
      console.log(newDay.getDate());
      newDay.setDate(newDay.getDate() + this.daycont );
      //PRINT LIKE JUNE 2
      this.date = newDay.toLocaleDateString('en-US', this.options);    
      this.dateElement.innerText = this.date;  
      //exist or not
      this.dateExist();
 
  }
 async onSubmit(event) {
    event.preventDefault();
    var txt = document.getElementById('editblock').value;
    const params = {
        day: this.date,
        content: txt
    }
    
    const fetchOptions = {
        method:'post',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
      },
      body: JSON.stringify(params)
    };
    console.log(fetchOptions);
    const result = await fetch('/save', fetchOptions);
    const response = await result.json();
    this.resultsDiv.innerHTML = this.getFormatCode(response.response);
    console.log(response);
    
  }
  async dateExist() {
    //event.preventDefault();
    console.log("judge data exist");
    const result = await fetch('/get/'+this.date);
    const response = await result.json();
    var txt = this.getFormatCode(response.content);
    txt = txt.replace("<br />","\n");
    this.resultsDiv.innerHTML = txt;
    console.log(response);
    console.log(this.getFormatCode(response.content));
    document.getElementById('editblock').value = txt;

  }
 editon(event){
    console.log(event.target.id);

    this.dateElement.classList.add('inactive');
    this.resultsDiv.classList.add('inactive');
    this.textElement.classList.remove('inactive');
    this.footerbtnElement.classList.add('inactive');
    this.checkbtnElement.classList.remove('inactive');
    this.checkbtnElement.addEventListener('click',this.editoff);
    this.containerElement.addEventListener('click',this.editoff);
    //this.containerElement.removeEventListener('click',this.onSubmit);
    this.containerElement.removeEventListener('click',this.editon);
    //this.onSubmit(); //get
}
 editoff(event){
    
    console.log(event.target.id);
    //console.log(document.getElementById('editblock').value);
    if(event.target.id == 'editblock') return;
    this.onSubmit(event);  //post
    this.dateElement.classList.remove('inactive');
    this.resultsDiv.classList.remove('inactive');
    this.textElement.classList.add('inactive');
    this.footerbtnElement.classList.remove('inactive');
    this.checkbtnElement.classList.add('inactive');
    this.containerElement.removeEventListener('click',this.editoff);
    //this.containerElement.addEventListener('click',this.onSubmit);
    this.containerElement.addEventListener('click',this.editon);
}
hide(){
    this.forwardbtnElement.removeEventListener('click',this.newDiary);
    this.backbtnElement.removeEventListener('click',this.newDiary);
    
}
getFormatCode(strValue){
    if(strValue){
        return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
    }
    else return '';
}
}
    
