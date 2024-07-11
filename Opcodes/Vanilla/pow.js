module.exports = {
    Pow: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]^Stk[Inst[OP_C]];",
        Mutate: (Instruction) => Instruction.Opcode = 17
    },
    PowB: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]^Stk[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 17;
            Instruction.B += 255;
        }
    },
    PowC: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]^Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 17;
            Instruction.C += 255;
        }
    },
    PowBC: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]^Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 17;
            Instruction.B += 255;
            Instruction.C += 255;
        }
    }
}