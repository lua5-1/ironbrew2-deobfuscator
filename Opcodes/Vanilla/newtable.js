module.exports = {
    NewTable: {
        Validator: "Stk[Inst[OP_A]]={};",
        Mutate: (Instruction) => Instruction.Opcode = 10
    },
    // ^ NewTableB5000
    NewTableBElse: {
        Validator: "Stk[Inst[OP_A]]={unpack({}, 1, Inst[OP_B])};",
        Mutate: (Instruction) => Instruction.Opcode = 10
    },
}