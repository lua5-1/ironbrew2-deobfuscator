module.exports = {
    TailCall: {
        Validator: "local A=Inst[OP_A];local Args={};local Limit=A+Inst[OP_B]-1;for Idx=A+1,Limit do Args[#Args+1]=Stk[Idx];end;do return Stk[A](Unpack(Args,1,Limit-A)) end;",
        Mutate: (Instruction) => Instruction.Opcode = 29
    },
    TailCallB0: {
        Validator: "local A=Inst[OP_A];local Args={};local Limit=Top;for Idx=A+1,Limit do Args[#Args+1]=Stk[Idx];end;do return Stk[A](Unpack(Args,1,Limit-A)) end;",
        Mutate: (Instruction) => Instruction.Opcode = 29
    },
    TailCallB1: {
        Validator: "local A=Inst[OP_A];do return Stk[A](); end;",
        Mutate: (Instruction) => Instruction.Opcode = 29
    }
}