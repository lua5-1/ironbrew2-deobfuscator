module.exports = class {
    Left;
    Right;
    
    Locals;

    constructor (Left, Right, Locals) {
        this.Left = Left;
        this.Right = Right;
        this.Locals = Locals ?? [];
    }

    StatementList(Left, Right) {
        for (let Key in Left) {
            if (!this.Statement(Left[Key], Right[Key])) {
                return false;
            }
        }

        return true;
    }

    Expression(Left, Right) {
        // if you have a better solution -> contribute
        if (Right?.name == "OP_MOVE") return true;

        if (!this.CheckIntegrity(Left, Right)) {
            return false;
        }

        switch (Left.type) {
            case "Identifier": {
                if (this.Locals.includes(Left.name)) {
                    break;
                }

                if (Left.name != Right.name) {
                    return false;
                }

                break;
            }
            case "StringLiteral":
            case "NumericLiteral":
            case "BooleanLiteral": {
                if (Left.raw != Right.raw) {
                    return false;
                }
                break;
            }
            case "LogicalExpression":
            case "BinaryExpression": {
                if (Left.operator != Right.operator || !this.Expression(Left.right, Right.right)) {
                    return false;
                }

                break;
            }
            case "UnaryExpression": {
                if (Left.operator != Right.operator || !this.Expression(Left.argument, Right.argument)) {
                    return false;
                }

                break;
            }
            case "CallExpression": {
                if (!this.CheckIntegrity(Left.arguments, Right.arguments) || !this.Expression(Left.base, Right.base)) {
                    return false;
                }

                for (let Key in Left.arguments) {
                    if (!this.Expression(Left.arguments[Key], Right.arguments[Key])) {
                        return false;
                    }
                }

                break;
            }
            case "FunctionDeclaration": {
                for (let Key in Left.parameters) {
                    this.Locals.push(Left.parameters[Key].name, Right.parameters[Key].name);
                }

                if (!this.CheckIntegrity(Left.parameters, Right.parameters) || !this.StatementList(Left.body, Right.body)) {
                    return false;
                }

                break;
            }
            case "TableCallExpression": {
                if (!this.Expression(Left.base, Right.base) || !this.Expression(Left.arguments, Right.arguments)) {
                    return false;
                }
                break;
            }
            case "StringCallExpression": {
                if (!this.Expression(Left.base, Right.base) || !this.Expression(Left.argument, Right.argument)) {
                    return false;
                }
                break;
            }
            case "IndexExpression": {
                if (!this.Expression(Left.base, Right.base) || !this.Expression(Left.index, Right.index)) {
                    return false;
                }

                break;
            }
            case "MemberExpression": {
                if (!this.Expression(Left.base, Right.base) || !this.Expression(Left.identifier, Right.identifier)) {
                    return false;
                }
                break;
            }
            case "TableConstructorExpression": {
                if (!this.CheckIntegrity(Left.fields, Right.fields)) {
                    return false;
                }

                for (let Key in Left.fields) {
                    switch (Left.fields[Key].type) {
                        case "TableKey":
                        case "TableKeyString": {
                            if (!this.Expression(Left.fields[Key].key, Right.fields[Key].key) || !this.Expression(Left.fields[Key].value, Right.fields[Key].value)) {
                                return false;
                            }
                            break;
                        }
                        case "TableValue": {
                            if (!this.Expression(Left.fields[Key].value, Right.fields[Key].value)) {
                                return false;
                            }
                            break;
                        }
                    }
                }

                break;
            }
        }

        return true;
    }
       
    Statement(Left, Right) {
        if (!this.CheckIntegrity(Left, Right)) {
            return false;
        }

        switch (Left.type) {
            case "AssignmentStatement": {
                if (!this.CheckIntegrity(Left.variables,  Right.variables) || !this.CheckIntegrity(Left.init, Right.init)) {
                    return false;
                }

                for (let Key in Left.variables) {
                    if (!this.Expression(Left.variables[Key], Right.variables[Key])) {
                        return false;
                    }
                }

                for (let Key in Left.init) {
                    if (!this.Expression(Left.init[Key], Right.init[Key])) {
                        return false;
                    }
                }

                break;
            }
            case "LocalStatement": {
                if (!this.CheckIntegrity(Left.variables,  Right.variables) || !this.CheckIntegrity(Left.init, Right.init)) {
                    return false;
                }

                for (let Key in Left.variables) {
                    this.Locals.push(Left.variables[Key].name, Right.variables[Key].name);
                }

                for (let Key in Left.init) {
                    if (!this.Expression(Left.init[Key], Right.init[Key])) {
                        return false;
                    }
                }

                break;
            }
            case "CallStatement": {
                if (!this.Expression(Left.expression, Right.expression)) {
                    return false;
                }

                break;
            }
            case "IfStatement": {
                if (!this.CheckIntegrity(Left.clauses, Right.clauses)) {
                    return false;
                }
                
                for (let Key in Left.clauses) {
                    if (Left.clauses[Key]?.condition) {
                        if (!this.Expression(Left.clauses[Key].condition, Right.clauses[Key].condition)) {
                            return false;
                        } 
                    } 

                    if (!this.StatementList(Left.clauses[Key].body, Right.clauses[Key].body)) {
                        return false;
                    } 
                }

                break;
            }
            case "WhileStatement": {
                if (!this.Expression(Left.condition, Right.condition) || !this.StatementList(Left.body, Right.body)) {
                    return false;
                }

                break;
            }
            case "DoStatement": {
                if (!this.StatementList(Left.body, Right.body)) {
                    return false;
                }

                break;
            }
            case "ReturnStatement": {
                if (!this.CheckIntegrity(Left.arguments, Right.arguments)) {
                    return false;
                }

                for (let Key in Left.arguments) {
                    if (!this.Expression(Left.arguments[Key], Right.arguments[Key])) {
                        return false;
                    }
                }

                break;
            }
            case "RepeatStatement": {
                if (!this.StatementList(Left.body, Right.body) || !this.Expression(Left.condition, Right.condition)) {
                    return false;
                }
                break;
            }
            case "FunctionDeclaration": {
                for (let Key in Left.parameters) {
                    this.Locals.push(Left.parameters[Key], Right.parameters[Key]);
                }

                if (Left.isLocal) {
                    this.Locals.push(Left.identifier.name, Right.identifier.name);
                }

                if (!this.CheckIntegrity(Left.parameters, Right.parameters)) {
                    return false;
                }
                if (!this.Expression(Left.identifier, Right.identifier) || !this.StatementList(Left.body, Right.body)) {
                    return false;
                }

                break;
            }
            case "ForGenericStatement": {
                if (!this.CheckIntegrity(Left.variables,  Right.variables) || !this.CheckIntegrity(Left.iterators, Right.iterators)) {
                    return false;
                }
                
                for (let Key in Left.variables) {
                    this.Locals.push(Left.variables[Key].name, Right.variables[Key].name);
                }

                for (let Key in Left.iterators) {
                    if (!this.Expression(Left.iterators[Key], Right.iterators[Key])) {
                        return false;
                    }
                }

                if (!this.StatementList(Left.body, Right.body)) {
                    return false;
                }

                break;
            }
            case "ForNumericStatement": {
                this.Locals.push(Left.variable.name, Right.variable.name);

                if (!this.Expression(Left.start, Right.start) || !this.Expression(Left.end, Right.end)) {
                    return false;
                }

                if (Left.step) {
                    if (!this.Expression(Left.step, Right.step)) {
                        return false;
                    } 
                }

                if (!this.StatementList(Left.body, Right.body)) {
                    return false;
                } 

                break;
            }
        }

        return true;
    }

    CheckIntegrity(Left, Right) {
        return Left && Right && Left?.type == Right?.type && Left?.length == Right?.length;
    }

    Finish() {
        return this.StatementList(this.Right, this.Left);
    }
}