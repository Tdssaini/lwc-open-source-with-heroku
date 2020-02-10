# LWC Open Source with Heroku

Lightning Web Component Open Source with Nodejs project. 


## Deploy project on Heroku

1. Deploy project using button
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/Tdssaini/lwc-open-source-with-heroku)
2. While deploying, enter org credentials to connect your developer org.


## Setup in Salesforce

1. Create a custom sObject 'Sessions' with API name 'Session__c'
2. Add below fields to Sessions sObject :
    1. Name - Text
    2. Room (Room__c) - Picklist of Rooms
    3. Description (Description__c) - Text Area
    4. Date and Time (Date_and_Time__c) - Date Time
    
3. Create a custom sObject 'Session Speaker' with API name 'Session_Speaker__c'
4. Add below fields to Session Speaker sObject : 
   1. Name - Auto Gen
   2. Speaker (Speaker__c) - Lookup to Contact sObject
   3. Session (Session__c) - Lookup to Session sObject
5. Create records in Sessions object and related Session Speaker object.
