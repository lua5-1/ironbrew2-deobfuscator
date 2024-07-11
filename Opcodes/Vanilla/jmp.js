module.exports = {
    Jmp: {
        Validator: "InstrPoint=InstrPoint+Inst[OP_B];",
        Mutate: (Instruction) => Instruction.Opcode = 22
    }
}