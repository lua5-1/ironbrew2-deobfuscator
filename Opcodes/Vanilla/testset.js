module.exports = {
    TestSet: {
        Validator: "local B=Stk[Inst[OP_B]];if B then InstrPoint=InstrPoint+1;else Stk[Inst[OP_A]]=B;InstrPoint=InstrPoint+Instr[InstrPoint+1][OP_B]+1;end;",
        Mutate:  (Instruction) => {
            Instruction.Opcode = 27
            Instruction.B = 0;
        }
    },
    TestSetC: {
        Validator: "local B=Stk[Inst[OP_B]];if not B then InstrPoint=InstrPoint+1;else Stk[Inst[OP_A]]=B;InstrPoint=InstrPoint+Instr[InstrPoint+1][OP_B]+1;end;",
        Mutate: (Instruction) => {
            Instruction.Opcode = 27
            Instruction.B = 1;
        }
    }
}