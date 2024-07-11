module.exports = {
    Vararg: {
        Validator: "local A=Inst[OP_A];local B=Inst[OP_B];for Idx=A,A+B-1 do Stk[Idx]=Vararg[Idx-A];end;",
        Mutate: (Instruction) => Instruction.Opcode = 37
    },
    VarargB0: {
        Validator: "local A=Inst[OP_A];Top=A+Varargsz-1;for Idx=A,Top do local VA=Vararg[Idx-A];Stk[Idx]=VA;end;",
        Mutate: (Instruction) => Instruction.Opcode = 37
    }
}