module.exports = {
    Not: {
        Validator: "Stk[Inst[OP_A]]=(not Stk[Inst[OP_B]]);",
        Mutate: (Instruction) => Instruction.Opcode = 19
    }
}