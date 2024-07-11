const Chunk = require("./IR/chunk");
const Instruction = require("./IR/instruction");
const Constant = require("./IR/constant");
const Reader = require("smart-buffer").SmartBuffer;

function getBit(Bit, Start, End) {
    if (End) {
        let Res = (Bit / Math.pow(2, Start - 1)) % Math.pow(2, (End - 1) - (Start - 1) + 1);
        return Res - Res % 1;
    } else {
        let Plc = Math.pow(2, Start - 1);
        return ((Bit % (Plc + Plc) >= Plc) && 1) || 0;
    }
}

module.exports = class {
    Reader;
    Bytestring;

    ConstantMapping;
    ChunkMapping;

    IXorKey1;
    IXorKey2;

    constructor (Bytestring, ConstantMapping, ChunkMapping, IXorKey1, IXorKey2) {
        this.Bytestring = Bytestring;
        this.Reader = Reader.fromBuffer(Bytestring);

        this.ConstantMapping = ConstantMapping;
        this.ChunkMapping = ChunkMapping;

        this.IXorKey1 = IXorKey1;
        this.IXorKey2 =  IXorKey2;
    }

    DecodeChunk() {
        const _Chunk = new Chunk();

        for (let Index = 0; Index < this.ChunkMapping.length; Index++) {
            switch (this.ChunkMapping[Index]) {
                case "Instructions": {
                    const Instructions = [];
                    const InstructionCount = this.Reader.readUInt32LE();
                
                    for (let Index = 0; Index < InstructionCount; Index++) {
                        const _Instruction = new Instruction(_Chunk);
                        const Left = ((this.Reader.readUInt32LE()) ^ this.IXorKey1) >>> 0;
                        const Right = ((this.Reader.readUInt32LE()) ^ this.IXorKey2) >>> 0;

                        const Type = getBit(Left, 1, 2);
                        _Instruction.Enum = getBit(Right, 1, 11);
                        _Instruction.A = getBit(Left, 3, 11);

                        switch (Type) {
                            case 0: {
                                _Instruction.B = getBit(Left, 12, 20);
                                _Instruction.C = getBit(Left, 21, 29);
                                break;
                            } 
                            case 1: {
                                _Instruction.B = getBit(Right, 12, 33);
                                break;
                            }
                            case 2: { 
                                _Instruction.B = getBit(Right, 12, 32) - 1048575;
                                break;
                            }
                            case 3: { 
                                _Instruction.B = getBit(Right, 12, 32) - 1048575;
                                _Instruction.C = getBit(Left, 21, 29);
                                break;
                            }
                        }

                        Instructions.push(_Instruction);
                    }

                    _Chunk.Instructions = Instructions;
                    break;
                }
                case "Constants": {
                    const Constants = [];
                    const ConstantCount = this.Reader.readUInt32LE();

                    for (let Index = 0; Index < ConstantCount; Index++) {
                        const _Constant = new Constant();
                        const Type = this.Reader.readUInt8();

                        switch (Type) {
                            case this.ConstantMapping[0]: {
                                _Constant.Type = 1;
                                _Constant.Value = this.Reader.readUInt8() != 0;
                                break;
                            }
                            case this.ConstantMapping[1]: {
                                _Constant.Type = 3;
                                _Constant.Value = this.Reader.readDoubleLE();
                                break;
                            }
                            case this.ConstantMapping[2]: {
                                _Constant.Type = 4;
                                _Constant.Value = this.Reader.readString(this.Reader.readUInt32LE());
                                break;
                            }
                        }
                        
                        Constants.push(_Constant);
                    }

                    _Chunk.Constants = Constants;
                    break;
                }
                case "Prototypes": {
                    const Prototypes = [];
                    const PrototypeCount = this.Reader.readUInt32LE();

                    for (let Index = 0; Index < PrototypeCount; Index++) {
                        Prototypes.push(this.DecodeChunk());
                    }

                    _Chunk.Prototypes = Prototypes;
                    break;
                }
                case "Parameters": {
                    _Chunk.ParameterCount = this.Reader.readUInt8();
                    break;
                }
                case "Lines": {
                    const Lines = [];
                    const LineCount = this.Reader.readUInt32LE();

                    for (let Index = 0; Index < LineCount; Index++) {
                        Lines.push(this.Reader.readUInt32LE());
                    }

                    _Chunk.Lines = Lines;
                    break;
                }
            }
        }

        return _Chunk;
    }
}
