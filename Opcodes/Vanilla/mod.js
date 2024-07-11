module.exports = {
    Mod: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]%Stk[Inst[OP_C]];",
        Mutate: (Instruction) => Instruction.Opcode = 16
    },
    ModB: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]%Stk[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 16;
            Instruction.B += 255;
        }
    },
    ModC: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]%Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 16;
            Instruction.C += 255;
        }
    },
    ModBC: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]%Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 16;
            Instruction.B += 255;
            Instruction.C += 255;
        }
    }
}