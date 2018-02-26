/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/*jslint node:true  */
/*jslint esversion:6 */

"use strict";
console.log("START");
const Alexa = require("alexa-sdk");

const USER_ID = "amzn1.ask.skill.dc4e88a8-9bee-4630-8dbd-f3e96d5e95ab";
const APP_ID = "amzn1.ask.skill.dc4e88a8-9bee-4630-8dbd-f3e96d5e95ab";

const languageStrings = {
  en: {
    translation: {
      SKILL_NAME: "Snooze Bot",
      STOP_MESSAGE: "Goodbye!",
      WELCOME_MESSAGE: "Welcome to SnoozABot.",
      WELCOME_REPROMPT: "What did you say?"
    }
  }
};

const handlers = {
  LaunchRequest: function() {
    console.log("Launched");
    this.emit(":ask", this.t("WELCOME_MESSAGE"), this.t("WELCOME_REPROMPT"));
  },
  "AMAZON.HelpIntent": function() {
    const speechOutput = this.t("HELP_MESSAGE");
    const reprompt = this.t("HELP_REPROMPT");
    this.emit(":ask", speechOutput, reprompt);
  },
  "AMAZON.CancelIntent": function() {
    this.emit(":tell", this.t("STOP_MESSAGE"));
  },
  "AMAZON.StopIntent": function() {
    this.emit(":tell", this.t("STOP_MESSAGE"));
  },
  "AMAZON.YesIntent": function() {
    this.emit("ZoneLookupIntent");
  },
  "AMAZON.NoIntent": function() {
    this.emit(":tell", this.t("STOP_MESSAGE"));
  },
  Unhandled: function() {
    this.emit(":ask", this.t("HELP_MESSAGE"), this.t("HELP_REPROMPT"));
  }
};

const returnDefaultEvent = event =>
  Object.assign(
    {},
    {
      request: {
        locale: "en-US",
        type: "LaunchRequest"
      },
      session: {
        application: {
          applicationId: APP_ID
        },
        user: {
          userId: USER_ID
        }
      }
    },
    event
  );

function fail(err) {
  console.log("failed: " + JSON.stringify(err));
  this.emit(":tell", "oops! something failed, sorry charlie.");
}

exports.handler = function(event, context) {
  console.log(
    "START HANDLER - event: " +
      JSON.stringify(event) +
      " context: " +
      JSON.stringify(context)
  );
  const alexa = Alexa.handler(returnDefaultEvent(event), context);
  alexa.appId = APP_ID;
  // To enable string internationalization (i18n) features, set a resources object.
  alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  console.log("EXECUTE");
  alexa.execute();
};
