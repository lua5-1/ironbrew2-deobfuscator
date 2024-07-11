module.exports = {
    GetTable: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]][Stk[Inst[OP_C]]];",
        Mutate: (Instruction) => Instruction.Opcode = 6
    },
    GetTableConst: {
        Validator: "Stk[Inst[OP_A]]=Stk[Inst[OP_B]][Const[Inst[OP_C]]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 6;
            Instruction.C += 255;
        }
    }
}