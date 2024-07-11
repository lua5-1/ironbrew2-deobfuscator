module.exports = {
    Sub: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]-Stk[Inst[OP_C]];",
        Mutate: (Instruction) => Instruction.Opcode = 13
    },
    SubB: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]-Stk[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 13;
            Instruction.B += 255;
        }
    },
    SubC: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]-Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 13;
            Instruction.C += 255;
        }
    },
    SubBC: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]-Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 13;
            Instruction.B += 255;
            Instruction.C += 255;
        }
    }
}