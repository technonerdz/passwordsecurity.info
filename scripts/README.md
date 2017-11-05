# Scripts for your own website

## Introduction

PasswordSecurity.info provides a JavaScript script to check for pwned passwords on your own website. All scripts in this folder are open source and can be modified to be included on your own website. 

If you want to use our exact script to check for pwned password on you Sign In form you can use the script from our CDN by following the instructions:

First, you will need to include the script with a script tag:
> ```<script src="https://passwordsecurity.info/scripts/passwordchecker.js"></script> ```

On your form, you will have to modify the input attributes to set the id to 'passwordbox' and to add a onKeyUp JavaScript function. Here is an example:

> ```<input type="password" name="psw" id='passwordbox' onkeyup="passwordmodified()"> ```

Then you will need somewhere to put the text to tell the user that they have been pwned by using an id of "verifytext". You can place it wherever you want. Here is an example:

> ```<p id="verifytext"></p> ```
