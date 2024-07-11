const FS = require("fs");
const Comparer = require("../AST/compare");
const Parser = require("../AST/parser");

module.exports = class {
    AST;

    Bytestring;
    PrimaryXorKey;
    
    ConstantMapping;
    ChunkMapping;

    IXorKey1;
    IXorKey2;

    Wrap;

    Instructions;
    Constants;
    Prototypes;
    Parameters;

    Upvalues;
    Environment;

    Vararg;

    OpenUpvalues;
    Stack;
    PC;
    Top;

    Setmetatable;
    Unpack;
    Returns;

    VarargCount;
    Instruction;
    Enum;
    
    Opcodes;
    OpcodeMap;

    constructor (AST) {
        this.AST = AST;
        this.Opcodes = {};
        this.OpcodeMap = {};
    }

    Initiate() {
        const Body = this.AST.body;

        {
            let Bytestring = Body.find(Value => Value.type == "AssignmentStatement" && Value.variables[0].name == "ByteString");
            
            if (Bytestring?.init) {
                this.Bytestring = Bytestring.init[0].raw.slice(1, -1);
            } else {
                this.Bytestring = Body.find((Value, Index) => Value.type == "LocalStatement" && Value?.init[0]?.type == "CallExpression" && Value.init[0]?.base?.name == Body[Index - 1]?.identifier?.name).init[0].arguments[0].raw.slice(1, -1);
            }
        }

        this.PrimaryXorKey = Body.find((Value, Index) => Value.type == "FunctionDeclaration" && Body[Index - 1].type == "LocalStatement" && Body[Index - 2].type == "FunctionDeclaration").body.at(-3).init[0].arguments.at(-1).value;

        const DeserializerBody = Body.find((Value) => Value.type == "FunctionDeclaration" && Value.parameters.length == 0 && Value.identifier.name == Body.at(-1).arguments[0].base.arguments[0].base.name).body;
        const Instructions = DeserializerBody.find((Value) => Value.type == "ForNumericStatement" &&  Value.body[1]?.init?.length != 0 &&  Value.body.at(-1)?.type == "AssignmentStatement" && Value.body.at(-2)?.type == "IfStatement");
        const Constants = DeserializerBody.find((Value) => Value.type == "ForNumericStatement" && Value.body[1]?.init?.length == 0 && Value.body.at(-1).type == "AssignmentStatement" && Value.body.at(-2).type == "IfStatement")
        const Prototypes = DeserializerBody.find((Value) => Value.type == "ForNumericStatement" && Value.body[0].type == "AssignmentStatement" && Value.body[0]?.variables[0]?.index?.type == "BinaryExpression");
        const Parameters = DeserializerBody.find((Value) => Value.type == "AssignmentStatement" && Value.init[0].type == "CallExpression");
        const Lines = DeserializerBody.find((Value) => Value.type == "ForNumericStatement" && Value.body[0].type == "AssignmentStatement" && Value != Prototypes);

        this.IXorKey1 = Instructions.body[0].init[0].arguments.at(-1).value;
        this.IXorKey2 = Instructions.body[1].init[0].arguments.at(-1).value;
        
        const MappingClauses = Constants.body.at(-2).clauses;
        this.ConstantMapping = [
            MappingClauses[0].condition.right.value,
            MappingClauses[1].condition.right.value,
            MappingClauses[2].condition.right.value
        ]

        this.ChunkMapping = [
            `Instructions:${DeserializerBody.indexOf(Instructions)}`,
            `Constants:${DeserializerBody.indexOf(Constants)}`,
            `Prototypes:${DeserializerBody.indexOf(Prototypes)}`,
            `Parameters:${DeserializerBody.indexOf(Parameters)}`,
            Lines ? `Lines:${DeserializerBody.indexOf(Lines)}` : ""
        ].sort((Left, Right) => Left.split(":")[1] - Right.split(":")[1]).map(Map => Map.split(":")[0]);

        const Wrap = Body.find((Value) => Value.type == "FunctionDeclaration" && Value.isLocal && Value.parameters.length == 3 && Value.body.length == 5 && Value.body.at(-1).type == "ReturnStatement");
        this.Setmetatable = Body.find((Value) => Value.type == "LocalStatement" && Value?.init[0].name == "setmetatable").variables[0].name;
        this.Unpack = Body.find((Value) => Value.type == "LocalStatement" && Value?.init[0].name == "unpack").variables[0].name;
        this.Returns = Body.find((Value) => Value?.parameters?.length == 1 && Value.parameters[0]?.type == "VarargLiteral" && Value?.body[0]?.type == "ReturnStatement").identifier.name;
        
        let Clauses;
        if (Lines) {
            this.Wrap = Wrap.identifier.name;
            const ReturnFunction = Wrap.body.at(-1).arguments[0].body
            const InterpreterBody = ReturnFunction.at(-3).body;
            const LoopBody = InterpreterBody.at(-1).body;
            Clauses = LoopBody.at(-2).clauses;
            
            this.Instructions = InterpreterBody[0].variables[0].name;
            this.Constants = InterpreterBody[1].variables[0].name;
            this.Prototypes = InterpreterBody[2].variables[0].name;
            this.Parameters = InterpreterBody[3].variables[0].name;

            this.Upvalues = Wrap.parameters[1].name;
            this.Environment = Wrap.parameters[2].name; 
            
            this.Vararg =  InterpreterBody.at(-8).variables[0].name;

            this.OpenUpvalues = InterpreterBody.at(-7).variables[0].name;
            this.Stack = InterpreterBody.at(-6).variables[0].name; 
            this.PC = ReturnFunction[0].variables[0].name;
            this.Top = ReturnFunction[1].variables[0].name;

            this.VarargCount = InterpreterBody.at(-4).variables[0].name;
            this.Instruction = InterpreterBody.at(-3).variables[0].name;
            this.Enum = InterpreterBody.at(-2).variables[0].name;
        } else {
            this.Wrap = Wrap.identifier.name;
            const InterpreterBody = Wrap.body.at(-1).arguments[0].body;
            const LoopBody = InterpreterBody.at(-1).body;
            Clauses = LoopBody.at(-2).clauses;
     
            this.Instructions = InterpreterBody[0].variables[0].name;
            this.Constants = InterpreterBody[1].variables[0].name;
            this.Prototypes = InterpreterBody[2].variables[0].name;
            this.Parameters = InterpreterBody[3].variables[0].name;
        
            this.Upvalues = Wrap.parameters[1].name;
            this.Environment = Wrap.parameters[2].name;  

            this.Vararg = InterpreterBody.at(-8).variables[0].name;
    
            this.OpenUpvalues = InterpreterBody.at(-7).variables[0].name;
            this.Stack = InterpreterBody.at(-6).variables[0].name;
            this.PC = InterpreterBody[5].variables[0].name;
            this.Top = InterpreterBody[6].variables[0].name;
    
            this.VarargCount = InterpreterBody.at(-4).variables[0].name;
            this.Instruction = InterpreterBody.at(-3).variables[0].name;
            this.Enum = InterpreterBody.at(-2).variables[0].name;
        }

        this.GenerateOpcodeMap(Clauses);

        FS.readdirSync(`../Opcodes/Vanilla/`).filter(File => File.endsWith(".js")).forEach((File) => {
            const Opcodes = require(`../Opcodes/Vanilla/${File}`);
            for (let Name in Opcodes) {
                this.Opcodes[Name] = Opcodes[Name];
            }
        })
    }

    Finish(Chunk) {
        for (var Index = 0; Index < Chunk.Instructions.length; Index++) {
            const Instruction = Chunk.Instructions[Index];
            const Opcode = this.OpcodeMap[Instruction.Enum];

            if (!Opcode) {
                throw `No opcode found for Enum ${Instruction.Enum}`; // not possible (unless its not even fucking ironbrew)
            }

            const SuperOperator = Opcode.some((Value, Index) => this.SuperOperator(Opcode, Index));

            if (SuperOperator) {
                const SuperOperatorOpcodes = [];
                const Locals = [];
                
                const LocalVariables = Opcode.filter((Value) => Value.type == "LocalStatement");
                const _Opcode = Opcode.filter((Value) => Value.type != "LocalStatement");

                for (let Index = 0; Index < LocalVariables.length; Index++) {
                    for (let _Index = 0; _Index < LocalVariables[Index].variables.length; _Index++) {
                        Locals.push(LocalVariables[Index].variables[_Index].name);
                    }
                }

                for (let Index = 0; Index < _Opcode.length; Index += 2) {
                    const Opcode = [];

                    while (_Opcode[Index] && !this.SuperOperator(_Opcode, Index)) {
                        Opcode.push(_Opcode[Index]);
                        Index++;
                    }

                    if (Opcode.length) {
                        SuperOperatorOpcodes.push(Opcode);
                    }
                }
                
                for (let _Index = 0; _Index < SuperOperatorOpcodes.length; _Index++) {
                    const Opcode = SuperOperatorOpcodes[_Index];
                    const Instruction = Chunk.Instructions[Index + _Index];

                    if (!this.CompareInstruction(Instruction, Opcode, Locals)) {
                        throw `Failed to match opcode for SuperOperator ${_Index} #${Instruction.Enum}`;
                    }
                }
                
                Index += SuperOperatorOpcodes.length - 1;
            } else {
                if (!this.CompareInstruction(Instruction, Opcode)) {
                    throw `Failed to match opcode for #${Instruction.Enum}`; 
                }
            }
        }

        for (let Index = 0; Index < Chunk.Prototypes.length; Index++) {
            this.Finish(Chunk.Prototypes[Index]);
        }
    }

    CompareInstruction(Instruction, Opcode, Locals) {
        for (let [Key, Handler] of Object.entries(this.Opcodes)) {
            if (this.Compare(Handler.Validator, Opcode, Locals)) {
                Handler.Mutate(Instruction);
                return true;
            }
        }

        return false;
    }

    ReplaceVariables(Data) {
        return Data.split("Setmetatable").join(this.Setmetatable)
        .split("Unpack").join(this.Unpack)
        .split("_R").join(this.Returns)
        .split("Wrap").join(this.Wrap)
        .split("InstrPoint").join(this.PC)
        .split("Instr").join(this.Instructions)
        .split("Const").join(this.Constants)
        .split("Proto").join(this.Prototypes)
        .split("Params").join(this.Parameters)
        .split("Inst").join(this.Instruction)
        .split("Vararg").join(this.Vararg)
        .split("Varargsz").join(this.VarargCount)
        .split("OP_ENUM").join(1)
        .split("OP_A").join(2)
        .split("OP_B").join(3)
        .split("OP_C").join(5)
        .split("Upvalues").join(this.Upvalues)
        .split("Env").join(this.Environment)
        .split("Lupvals").join(this.OpenUpvalues)
        .split("Stk").join(this.Stack)
        .split("Top").join(this.Top);
    }

    SolveLocals(Data) {
        let Regex = /local(.*?)([;=])+/i;
        let Match;

        while ((Match = Regex.exec(Data))) {
            if (Match[2] == ";") {
                Data = Data.split(`local${Match[1]}`).join(Match[1]);
            } else {
                Data = Data.split(`local${Match[1]};`).join("");
            }
        }

        return Data;
    }

    Compare(Left, Right, Locals) {
        let Data = this.ReplaceVariables(Left);

        if (Locals) {
            Data = this.SolveLocals(Data)
        }

        return (new Comparer(Parser.parse(Data).body, Right, Locals)).Finish();
    }
    
    FindEnumForElseClause(Clauses, Index) {
        if (!Clauses[Index]) {
            throw `Invalid Clause`;
        }

        if (Clauses[Index].type == "ElseClause") {
            return this.FindEnumForElseClause(Clauses, Index - 1);
        }

        if (!Clauses[Index]?.condition?.right?.raw) {
            return this.FindEnumForElseClause(Clauses, Index - 1);
        }

        const Operator = Clauses[Index].condition.operator;

        switch (Operator) {
            case ">": {
                return Clauses[Index].condition.right.value + 2;
            }
            case "==": {
                return Clauses[Index].condition.right.value + 1;
            }
        }
    }

    IsEnumOperation(IfStatement) {
        if (IfStatement.clauses) {
            const Clauses = IfStatement.clauses;

            for (let Index = 0; Index < Clauses.length; Index++) {
                const Clause = Clauses[Index];

                if (!Clause || !Clause.condition) {
                    continue;
                }

                // adding up: left.name might not exist, but it doesnt matter we just make sure the condition actually exists
                // which is: undefined != this.Enum
                if (Clause.condition?.left?.name != this.Enum) {
                    return false;
                }
            }

            return true;
        }

        throw `No Clauses in IfStatement`;
    }

    GenerateOpcodeMap(Clauses) {
        for (let Index = 0; Index < Clauses.length; Index++) {
            const Clause = Clauses[Index];
            const Operator = Clause?.condition?.operator;

            if (Clause.type == "ElseClause") {
                const Enum = this.FindEnumForElseClause(Clauses, Index - 1);
                this.OpcodeMap[Enum] = Clause.body;
                continue;
            }

            switch (Operator) {
                case ">": {
                    const Then = Clause.body;
                    const Else = Clauses[Index + 1]?.body;

                    this.OpcodeMap[Clause.condition.right.value + 1] = Then;
                    this.OpcodeMap[Clause.condition.right.value] = Else;
                    break;
                }
                case "==": {
                    const Then = Clause.body;
                    const Else = Clauses[Index + 1]?.body;

                    this.OpcodeMap[Clause.condition.right.value] = Then;
                    this.OpcodeMap[Clause.condition.right.value + 1] = Else;
                    break;
                }
                case "<=": {
                    if (Clause.body[0].type == "IfStatement" && this.IsEnumOperation(Clause.body[0])) {
                        this.GenerateOpcodeMap(Clause.body[0].clauses);
                    } else {
                        const Then = Clause.body;
                        const Else = Clauses[Index + 1]?.body;

                        this.OpcodeMap[Clause.condition.right.value] = Then;
                        this.OpcodeMap[Clause.condition.right.value + 1] = Else;
                    }
                    break;
                }
            }
        }
    }

    SuperOperator(Opcode, Index) {
        if (this.Compare("InstrPoint = InstrPoint+1;Inst=Instr[InstrPoint];", [Opcode[Index], Opcode[Index + 1]])) {
            return true;
        }

        return false;
    }
}
