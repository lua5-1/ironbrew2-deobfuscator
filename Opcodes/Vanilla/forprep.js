module.exports = {
    ForPrep: {
        Validator: "local A=Inst[OP_A];Stk[A]=Stk[A]-Stk[A+2];InstrPoint=InstrPoint+Inst[OP_B];",
        Mutate: (Instruction) => Instruction.Opcode = 32
    }
}