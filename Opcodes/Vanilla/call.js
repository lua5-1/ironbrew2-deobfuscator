module.exports = {
    Call: {
        Validator: "local A=Inst[OP_A];local Args={};local Edx=0;local Limit=A+Inst[OP_B]-1;for Idx=A+1,Limit do Edx=Edx+1;Args[Edx]=Stk[Idx];end;local Results={Stk[A](Unpack(Args,1,Limit-A))};local Limit=A+Inst[OP_C]-2;Edx=0;for Idx=A,Limit do Edx=Edx+1;Stk[Idx]=Results[Edx];end;Top=Limit;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    },
    CallB0: {
        Validator: "local A=Inst[OP_A];local Args={};local Edx=0;local Limit=Top;for Idx=A+1,Limit do Edx=Edx+1;Args[Edx]=Stk[Idx];end;local Results={Stk[A](Unpack(Args,1,Limit-A))};local Limit=A+Inst[OP_C]-2;Edx=0;for Idx=A,Limit do Edx=Edx+1;Stk[Idx]=Results[Edx];end;Top=Limit;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    },
    CallB1: {
        Validator: "local A=Inst[OP_A];local Results,Limit={Stk[A]()};local Limit=A+Inst[OP_C]-2;local Edx=0;for Idx=A,Limit do Edx=Edx+1;Stk[Idx]=Results[Edx];end;Top=Limit;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    },
    CallC0: {
        Validator: "local A=Inst[OP_A];local Args={};local Edx=0;local Limit=A+Inst[OP_B]-1;for Idx=A+1,Limit do Edx=Edx+1;Args[Edx]=Stk[Idx];end;local Results,Limit=_R(Stk[A](Unpack(Args,1,Limit-A)));Limit=Limit+A-1;Edx=0;for Idx=A,Limit do Edx=Edx+1;Stk[Idx]=Results[Edx];end;Top=Limit;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    },
    CallC1: {
        Validator: "local A=Inst[OP_A];local Args={};local Edx=0;local Limit=A+Inst[OP_B]-1;for Idx=A+1,Limit do Edx=Edx+1;Args[Edx]=Stk[Idx];end;Stk[A](Unpack(Args,1,Limit-A));Top=A;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    },
    CallB0C0: {
        Validator: "local A=Inst[OP_A];local Args={};local Edx=0;local Limit=Top;for Idx=A+1,Limit do Edx=Edx+1;Args[Edx]=Stk[Idx];end;local Results,Limit=_R(Stk[A](Unpack(Args,1,Limit-A)));Limit=Limit+A-1;Edx=0;for Idx=A,Limit do Edx=Edx+1;Stk[Idx]=Results[Edx];end;Top=Limit;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    },
    CallB0C1: {
        Validator: "local A=Inst[OP_A];local Args={};local Edx=0;local Limit=Top;for Idx=A+1,Limit do Edx=Edx+1;Args[Edx]=Stk[Idx];end;Stk[A](Unpack(Args,1,Limit-A));Top=A;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    },
    CallB1C0: {
        Validator: "local A=Inst[OP_A];local Results,Limit=_R(Stk[A]());Top=A-1;Limit=Limit+A-1;local Edx=0;for Idx=A,Limit do Edx=Edx+1;Stk[Idx]=Results[Edx];end;Top=Limit;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    },
    CallB1C1: {
        Validator: "Stk[Inst[OP_A]]();Top=A;",
        Mutate: (Instruction) => Instruction.Opcode = 28
    }
}