module.exports = {
    SetList: {
        Validator: "local A=Inst[OP_A];local Offset=(Inst[OP_C]-1)*50;local T=Stk[A];local B=Inst[OP_B];for Idx=1,B do T[Offset+Idx]=Stk[A+Idx] end;",
        Mutate: (Instruction) => Instruction.Opcode = 34
    },
    SetListC1: {
        Validator: "local A=Inst[OP_A];local T=Stk[A];local B=Inst[OP_B];for Idx=1,B do T[Idx]=Stk[A+Idx] end;",
        Mutate: (Instruction) => Instruction.Opcode = 34
    },
    SetListB0: {
        Validator: "local A=Inst[OP_A];local Offset=(Inst[OP_C]-1)*50;local T=Stk[A];local X=Top-A;for Idx=1,X do T[Offset+Idx]=Stk[A+Idx] end;",
        Mutate: (Instruction) => Instruction.Opcode = 34
    },
    SetListC0: {
        Validator: "local A=Inst[OP_A];InstrPoint=InstrPoint+1;local Offset=(Instr[InstrPoint][5]-1)*50;local T=Stk[A];local B=Inst[OP_B];for Idx=1,B do T[Offset+Idx]=Stk[A+Idx] end;",
        Mutate: (Instruction) => Instruction.Opcode = 34
    },
    SetListB0C0: {
        Validator: "local A=Inst[OP_A];InstrPoint=InstrPoint+1;local Offset=(Instr[InstrPoint][5]-1)*50;local T=Stk[A];local X=Top-A;for Idx=1,X do T[Offset+Idx]=Stk[A+Idx] end;",
        Mutate: (Instruction) => Instruction.Opcode = 34
    },
    SetListB0C1: {
        Validator: "local A=Inst[OP_A];local T=Stk[A];local X=Top-A;for Idx=1,X do T[Idx]=Stk[A+Idx] end;",
        Mutate: (Instruction) => Instruction.Opcode = 34
    }
}