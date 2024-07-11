module.exports = {
    Unm: {
        Validator: "Stk[Inst[OP_A]]=-Stk[Inst[OP_B]];",
        Mutate: (Instruction) => Instruction.Opcode = 18
        
    }
}