<?php
    if(isset($_POST['submit']))
    {
        $name = $_POST['name']; // Get Name value from HTML Form
        $mail_subject = $_POST['subject']; // Get Subject of message
        $email_id = $_POST['email']; // Get Email Value
        $msg = $_POST['message']; // Get Message Value
        $to = "iamheremaurya@gmail.com"; // You can change here your Email
        $subject = "Website Contact Form form $email_id"; // This is your subject
         
        // HTML Message Starts here
        $message ="
        <html>
            <body>
                <table style='width:600px;'>
                    <tbody>
                        <tr>
                            <td style='width:150px'><strong>Name: </strong></td>
                            <td style='width:400px'>$name</td>
                        </tr>
                        <tr>
                            <td style='width:150px'><strong>Subject: </strong></td>
                            <td style='width:400px'>$mail_subject</td>
                        </tr>
                        <tr>
                            <td style='width:150px'><strong>Email ID: </strong></td>
                            <td style='width:400px'>$email_id</td>
                        </tr>
                        <tr>
                            <td style='width:150px'><strong>Message: </strong></td>
                            <td style='width:400px'>$msg</td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
        ";
        // HTML Message Ends here
         
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
 
        // More headers
        $headers .= "From: $to"; // Give an email id on which you want get a reply. User will get a mail from this email id
        //$headers .= 'Cc: info@websapex.com' . "\r\n"; // If you want add cc
        //$headers .= 'Bcc: boss@websapex.com' . "\r\n"; // If you want add Bcc
        
        if(mail($to,$subject,$message,$headers)){ 
        //if(mail($to,$subject,$message)){
            // Message if mail has been sent
            echo "<script>
                    alert('Message Sent Succesfully');
                    window.location = 'index.html';
                </script>";
        }
 
        else{
            // Message if mail has been not sent
            echo "<script>
                    alert('FAILED to Send Message, Please try to reach through Mail');
                    window.location = 'index.html';
                </script>";
        }
    }
?>
