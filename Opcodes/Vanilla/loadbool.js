module.exports = {
    LoadBool: {
        Validator: "Stk[Inst[OP_A]]=(Inst[OP_B]~=0);",
        Mutate: (Instruction) => Instruction.Opcode = 2
    },
    LoadBoolC: {
        Validator: "Stk[Inst[OP_A]]=(Inst[OP_B]~=0);InstrPoint=InstrPoint+1;",
        Mutate: (Instruction) => {
            Instruction.Opcode = 2;
            Instruction.C = 1;
        }
    }
}