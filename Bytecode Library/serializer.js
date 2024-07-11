const _Writer = require("smart-buffer").SmartBuffer;

module.exports = class {
    Writer;
    Top;

    constructor() {
        this.Writer = new (_Writer)();
        this.Top = true;
    }

    Finish() {
        return this.Writer.toBuffer();
    }

    Initiate(Chunk) {
        if (this.Top) {
            this.WriteHeader();           
        }

        this.WriteChunk(Chunk);

        this.Writer.writeUInt32LE(Chunk.Instructions.length);
        for (let Index = 0; Index < Chunk.Instructions.length; Index++) {
            const Instruction = Chunk.Instructions[Index];

            let Value = 0;

            Value |= (Instruction.Opcode);
            Value |= (Instruction.A << 6);
    
            switch (Instruction.Type) {
                case "ABC": {
                    Value |= (Instruction.C << 14);
                    Value |= (Instruction.B << 23);
                    break;
                }
                case "ABx": {
                    Value |= (Instruction.B << 14);
                    break;
                }
                case "AsBx": {
                    Value |= ((Instruction.B + 131071) << 14);
                    break;
                }
            }
    
            Value >>>= 0; 
        
            this.Writer.writeUInt32LE(Value);
            Instruction.Value = Value;
        }

        this.Writer.writeUInt32LE(Chunk.Constants.length);
        for (let Index = 0; Index < Chunk.Constants.length; Index++) {
            const Constant = Chunk.Constants[Index];
            
            this.Writer.writeUInt8(Constant.Type);

            switch (Constant.Type) {
                case 1: {
                    this.Writer.writeUInt8(Constant.Value ? 1 : 0);
                    break;
                }
                case 3: {
                    this.Writer.writeDoubleLE(Constant.Value);
                    break;
                }
                case 4: {
                    this.Writer.writeUInt32LE(Constant.Value.length + 1);
                    this.Writer.writeStringNT(Constant.Value);
                    break;
                }
            }
        }
    
        this.Writer.writeUInt32LE(Chunk.Prototypes.length);
        for (let Index = 0; Index < Chunk.Prototypes.length; Index++) {
            if (this.Top) {
                this.Top = false;
            }
            this.Initiate(Chunk.Prototypes[Index]);
        }

        if (Chunk.Lines) {
            this.Writer.writeUInt32LE(Chunk.Lines.length);
            for (let Index = 0; Index < Chunk.Lines.length; Index++) {
                this.Writer.writeUInt32LE(Chunk.Lines[Index]);
            }
        } else {
            this.Writer.writeUInt32LE(0);
        }

        this.Writer.writeUInt32LE(0); // Locals
        this.Writer.writeUInt32LE(0); // Upvalues
    }

    WriteHeader() {
        this.Writer.writeString("\x1bLua"); // Signature
        this.Writer.writeUInt8(0x51); // Version (0x51 -> 5.1)
        this.Writer.writeUInt8(0); // Format (0 -> Official)
        this.Writer.writeUInt8(1); // Endianness (0 -> Big Endian, 1 -> Little Endian)
        this.Writer.writeUInt8(4); // SizeInt
        this.Writer.writeUInt8(4); // SizeT
        this.Writer.writeUInt8(4); // Instruction size
        this.Writer.writeUInt8(8); // lua_Number size 
        this.Writer.writeUInt8(0); // Integral Flag
    }

    WriteChunk(Chunk) {
        if (this.Top) {
            this.Writer.writeUInt32LE(Chunk.Name.length + 1); // Length of Name
            this.Writer.writeStringNT(Chunk.Name); // Name
        } else {
            this.Writer.writeUInt32LE(0);
        }
        
        this.Writer.writeUInt32LE(Chunk.Line); // Line
        this.Writer.writeUInt32LE(Chunk.LastLine); // Last line
        this.Writer.writeUInt8(Chunk.UpvalueCount); // Upvalue Count
        this.Writer.writeUInt8(Chunk.ParameterCount); // Parameter Count
        this.Writer.writeUInt8(Chunk.VarargFlag); // Vararg Flag
        this.Writer.writeUInt8(Chunk.MaxStacksize); // Max Stacksize
    }
}