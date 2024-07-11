module.exports = {
    Div: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]/Stk[Inst[OP_C]];",
        Mutate: (Instruction) => Instruction.Opcode = 15
    },
    DivB: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]/Stk[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 15;
            Instruction.B += 255;
        }
    },
    DivC: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]]/Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 15;
            Instruction.C += 255;
        }
    },
    DivBC: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]]/Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 15;
            Instruction.B += 255;
            Instruction.C += 255;
        }
    }
}