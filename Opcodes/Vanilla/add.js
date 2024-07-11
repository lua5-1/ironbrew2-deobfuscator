module.exports = {
    Add: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]+Stk[Inst[OP_C]];",
        Mutate: (Instruction) => Instruction.Opcode = 12
    },
    AddB: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]+Stk[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 12;
            Instruction.B += 255;
        }
    },
    AddC: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]+Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 12;
            Instruction.C += 255;
        }
    },
    AddBC: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]+Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 12;
            Instruction.B += 255;
            Instruction.C += 255;
        }
    }
}