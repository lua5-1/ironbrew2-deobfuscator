module.exports = {
    GetUpval: {
        Validator: "Stk[Inst[OP_A]]=Upvalues[Inst[OP_B]];",
        Mutate: (Instruction) => Instruction.Opcode = 4
    }
}