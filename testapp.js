if (Meteor.isClient) {
 MyCollection = new Meteor.Collection("myCol");
  Template.simpleForm.events({'submit form' : function(event, template) {
      event.preventDefault();

      firstname = template.find("input[name=firstname]");
      lastname = template.find("input[name=lastname]");   
      email = template.find("input[name=email]");

      // Do form validation

      var data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value
      };

      email.value="";
      firstname.value="";
      lastname.value="";

      MyCollection.insert(data, function(err) { 
        console.log(err);
      });

      Meteor.call('sendEmail',
                  'bkmorris8@gmail.com',
                  data.email,
                  'Hello from Meteor!',
                  'This is a test of Email.send.');


  }});


}

if (Meteor.isServer) {
  Meteor.startup(function () {

  Meteor.methods({
    sendEmail: function (to, from, subject, text) {
      check([to, from, subject, text], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    }
  });
     


  });
}
