module.exports = {
    Test: {
        Validator: "if Stk[Inst[OP_A]] then InstrPoint=InstrPoint+1;else InstrPoint=InstrPoint+Inst[OP_B];end;",
        Mutate: (Instruction) => {
            Instruction.Opcode = 26;
            Instruction.B = 0;
        }
    },
    TestC: {
        Validator: "if not Stk[Inst[OP_A]] then InstrPoint=InstrPoint+1;else InstrPoint=InstrPoint+Inst[OP_B];end;",
        Mutate: (Instruction) => {
            Instruction.Opcode = 26;
            Instruction.B = 0;
        }
    }
}