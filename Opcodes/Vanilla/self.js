module.exports = {
    Self: {
        Validator: "local A=Inst[OP_A];local B=Stk[Inst[OP_B]];Stk[A+1]=B;Stk[A]=B[Stk[Inst[OP_C]]];",
        Mutate: (Instruction) => Instruction.Opcode = 11
    },
    SelfC: {
        Validator: "local A=Inst[OP_A];local B=Stk[Inst[OP_B]];Stk[A+1]=B;Stk[A]=B[Const[Inst[OP_C]]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 11
            Instruction.C += 255;
        }
    }
}