module.exports = {
    SetGlobal: {
        Validator: "Env[Const[Inst[OP_B]]]=Stk[Inst[OP_A]];",
        Mutate: (Instruction) => Instruction.Opcode = 7
    }
}