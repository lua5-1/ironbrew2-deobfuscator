module.exports = {
    Lt: {
        Validator: "if(Stk[Inst[OP_A]]<Stk[Inst[OP_C]])then InstrPoint=InstrPoint+1;else InstrPoint=InstrPoint+Inst[OP_B];end;",
        Mutate: (Instruction) => {
            Instruction.Opcode = 24;
            Instruction.B = Instruction.A;
            Instruction.A = 0;
        }
    },
    LtB: {
        Validator: "if(Const[Inst[OP_A]]<Stk[Inst[OP_C]])then InstrPoint=InstrPoint+1;else InstrPoint=InstrPoint+Inst[OP_B];end;",
        Mutate: (Instruction) => {
            Instruction.Opcode = 24;
            Instruction.B = Instruction.A + 255;
            Instruction.A = 0;
        }
    },
    LtC: {
        Validator: "if(Stk[Inst[OP_A]]<Const[Inst[OP_C]])then InstrPoint=InstrPoint+1;else InstrPoint=InstrPoint+Inst[OP_B];end;",
        Mutate: (Instruction) => {
            Instruction.Opcode = 24;
            Instruction.B = Instruction.A;
            Instruction.C += 255;
            Instruction.A = 0;
        }
    },
    LtBC: {
        Validator: "if(Const[Inst[OP_A]]<Const[Inst[OP_C]])then InstrPoint=InstrPoint+1;else InstrPoint=InstrPoint+Inst[OP_B];end;",
        Mutate: (Instruction) => {
            Instruction.Opcode = 24;
            Instruction.B = Instruction.A + 255;
            Instruction.C += 255;
            Instruction.A = 0;
        }
    },
}