"use client";
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCase = message.toLowerCase();
    
    if (lowerCase.includes("account") || lowerCase.includes("balance")) {
      this.actionProvider.handleAccountHelp();
    }
    else if (lowerCase.includes("support") || lowerCase.includes("help")) {
      this.actionProvider.handleSupport();
    }
    else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;
