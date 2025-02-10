"use client";
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleDefault = () => {
    const message = this.createChatBotMessage("I'm here to help with:", {
      widget: "options"
    });
    this.updateChatbotState(message);
  };

  handleAccountHelp = () => {
    const message = this.createChatBotMessage("For account assistance:", {
      widget: "accountBalance"
    });
    this.updateChatbotState(message);
  };

  handleSupport = () => {
    const message = this.createChatBotMessage("Contact support 24/7 at support@novabank.com");
    this.updateChatbotState(message);
  };

  updateChatbotState = (message) => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  };
}

export default ActionProvider;
