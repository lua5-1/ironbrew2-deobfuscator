module.exports = {
    Mul: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]*Stk[Inst[OP_C]];",
        Mutate: (Instruction) => Instruction.Opcode = 14
    },
    MulB: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]*Stk[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 14;
            Instruction.B += 255;
        }
    },
    MulC: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]*Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 14;
            Instruction.C += 255;
        }
    },
    MulBC: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]*Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 14;
            Instruction.B += 255;
            Instruction.C += 255;
        }
    }
}