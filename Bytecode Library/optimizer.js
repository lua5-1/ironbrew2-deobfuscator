const InstructionTypes = [ 
    "ABC",	"ABx",	"ABC",	"ABC",
    "ABC",	"ABx",	"ABC",	"ABx",
    "ABC",	"ABC",	"ABC",	"ABC",
    "ABC",	"ABC",	"ABC",	"ABC",
    "ABC",	"ABC",	"ABC",	"ABC",
    "ABC",	"ABC",	"AsBx",	"ABC",
    "ABC",	"ABC",	"ABC",	"ABC",
    "ABC",	"ABC",	"ABC",	"AsBx",
    "AsBx",	"ABC",	"ABC",	"ABC",
    "ABx",	"ABC"
];

module.exports =  class {
    Chunk;

    Finish(Chunk) {
        this.SetVarargFlag(Chunk);
        this.SetMaxStacksize(Chunk);
        this.FixInstructions(Chunk);
        
        for (let Index = 0; Index < Chunk.Prototypes.length; Index++) {
            this.Finish(Chunk.Prototypes[Index]);
        }
    }

    FixInstructions(Chunk) {
        for (let Index = 0; Index < Chunk.Instructions.length; Index++) {
            const Instruction = Chunk.Instructions[Index];
            Instruction.Type = InstructionTypes[Instruction.Opcode];

            switch (Instruction.Opcode) {
                case 23:
                case 24:
                case 25:
                case 26:
                case 27: {
                    if (Chunk.Instructions[Index + 1].Opcode == 22 && Chunk.Instructions[Index + 2].Opcode == 22) {
                        Chunk.Instructions.splice(Index + 1, 1);
                    };
                    break;
                }
            }
        }
    }

    SetVarargFlag(Chunk) {
        let HasVararg = false;

        for (let Index = 0; Index < Chunk.Instructions.length; Index++) {
            const Instruction = Chunk.Instructions[Index];
            if (Instruction.Opcode == 37) { 
                HasVararg = true;
                break;
            }
        }

        if (HasVararg) {
            Chunk.VarargFlag = 3;
        } else {
            Chunk.VarargFlag = 2;
        }
    }

    SetMaxStacksize(Chunk) {
        let MaxStacksize = 2;
        
        for (let Index = 0; Index < Chunk.Instructions.length; Index++) {
            const Instruction = Chunk.Instructions[Index];
            if (Instruction.A + 1 > MaxStacksize) {
                MaxStacksize = Instruction.A + 1;
            }
        }

        Chunk.MaxStacksize = MaxStacksize;
    }
}