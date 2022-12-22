module.exports = {
    name: 'eval',
    description: 'Run un code donné',
    async run(client) {
        function clean(text) {
          if(typeof text === "string") 
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
          return text;
        }
       
        if(message.author.id !== "539510339713105950") return;
        const code = args.join(" ");
        const evaled = eval(code);
        const cleanCode = await clean(evaled);
        message.channel.send(cleanCode, { code: "js" });
    }
}