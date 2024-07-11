module.exports = {
    SetUpval: {
        Validator: "Upvalues[Inst[OP_B]]=Stk[Inst[OP_A]];",
        Mutate: (Instruction) => Instruction.Opcode = 8
    }
}