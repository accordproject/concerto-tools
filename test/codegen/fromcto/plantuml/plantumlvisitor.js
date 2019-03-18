/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const chai = require('chai');
chai.should();
const sinon = require('sinon');

const PlantUMLVisitor = require('../../../../lib/codegen/fromcto/plantuml/plantumlvisitor.js');

const ModelFile = require('composer-concerto').ModelFile;
const ModelManager = require('composer-concerto').ModelManager;
const AssetDeclaration = require('composer-concerto').AssetDeclaration;
const ParticipantDeclaration = require('composer-concerto').ParticipantDeclaration;
const ClassDeclaration = require('composer-concerto').ClassDeclaration;
const EnumDeclaration = require('composer-concerto').EnumDeclaration;
const EnumValueDeclaration = require('composer-concerto').EnumValueDeclaration;
const Field = require('composer-concerto').Field;
const RelationshipDeclaration = require('composer-concerto').RelationshipDeclaration;
const TransactionDeclaration = require('composer-concerto').TransactionDeclaration;
const fileWriter = require('composer-concerto').FileWriter;

describe('PlantUMLVisitor', function () {
    let plantUMLvisitor;
    let mockFileWriter;
    beforeEach(() => {
        plantUMLvisitor = new PlantUMLVisitor();
        mockFileWriter = sinon.createStubInstance(fileWriter);
    });

    describe('visit', () => {
        let param;
        beforeEach(() => {
            param = {
                property1: 'value1'
            };
        });

        it('should call visitModelManager for a ModelManager', () => {
            let thing = sinon.createStubInstance(ModelManager);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitModelManager');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');
            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should call visitModelFile for a ModelFile', () => {
            let thing = sinon.createStubInstance(ModelFile);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitModelFile');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');
            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should return visitParticipantDeclaration for a ParticipantDeclaration', () => {
            let thing = sinon.createStubInstance(ParticipantDeclaration);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitParticipantDeclaration');
            mockSpecialVisit.returns('Duck');
            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');
            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should return visitTransactionDeclaration for a TransactionDeclaration', () => {
            let thing = sinon.createStubInstance(TransactionDeclaration);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitTransactionDeclaration');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');

            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should return visitAssetDeclaration for a AssetDeclaration', () => {
            let thing = sinon.createStubInstance(AssetDeclaration);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitAssetDeclaration');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');

            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should return visitEnumDeclaration for a EnumDeclaration', () => {
            let thing = sinon.createStubInstance(EnumDeclaration);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitEnumDeclaration');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');

            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should return visitClassDeclaration for a ClassDeclaration', () => {
            let thing = sinon.createStubInstance(ClassDeclaration);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitClassDeclaration');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');

            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should return visitField for a Field', () => {
            let thing = sinon.createStubInstance(Field);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitField');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');

            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should return visitRelationship for a RelationshipDeclaration', () => {
            let thing = sinon.createStubInstance(RelationshipDeclaration);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitRelationship');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');

            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should return visitEnumValueDeclaration for a EnumValueDeclaration', () => {
            let thing = sinon.createStubInstance(EnumValueDeclaration);
            let mockSpecialVisit = sinon.stub(plantUMLvisitor, 'visitEnumValueDeclaration');
            mockSpecialVisit.returns('Duck');

            plantUMLvisitor.visit(thing, param).should.deep.equal('Duck');

            mockSpecialVisit.calledWith(thing, param).should.be.ok;
        });

        it('should throw an error when an unrecognised type is supplied', () => {
            let thing = 'Something of unrecognised type';

            (() => {
                plantUMLvisitor.visit(thing, param);
            }).should.throw('Unrecognised "Something of unrecognised type"');
        });
    });

    describe('visitModelManager', () => {

        it('should write to the model.puml file and call accept for each model file', () => {
            let param = {
                fileWriter: mockFileWriter
            };

            let acceptSpy = sinon.spy();
            let mockModelManagerDefinition = sinon.createStubInstance(ModelManager);
            mockModelManagerDefinition.getModelFiles.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);

            plantUMLvisitor.visitModelManager(mockModelManagerDefinition, param);
            param.fileWriter.openFile.withArgs('model.puml').calledOnce.should.be.ok;
            param.fileWriter.writeLine.callCount.should.deep.equal(5);
            param.fileWriter.closeFile.calledOnce.should.be.ok;
            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });
    });

    describe('visitModelFile', () => {
        let param;

        beforeEach(() => {
            param = {
                fileWriter: mockFileWriter
            };
        });

        it('should visit all declaration in a model file', () => {
            let acceptSpy = sinon.spy();
            let mockModelFileDefinition = sinon.createStubInstance(ModelFile);
            mockModelFileDefinition.getNamespace.returns;
            mockModelFileDefinition.getAllDeclarations.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);

            plantUMLvisitor.visitModelFile(mockModelFileDefinition, param);
            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });
    });

    describe('visitAssetDeclaration', () => {
        it('should write the class declaration for an asset', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockAssetDeclaration = sinon.createStubInstance(AssetDeclaration);
            mockAssetDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockAssetDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);

            plantUMLvisitor.visitAssetDeclaration(mockAssetDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(2);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person << (A,green) >> {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });

        it('should write the class declaration for an asset with a super type', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockAssetDeclaration = sinon.createStubInstance(AssetDeclaration);
            mockAssetDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockAssetDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);
            mockAssetDeclaration.getSuperType.returns('org.acme.Human');

            plantUMLvisitor.visitAssetDeclaration(mockAssetDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(3);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person << (A,green) >> {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);
            param.fileWriter.writeLine.getCall(2).args.should.deep.equal([0, 'org.acme.Person --|> org.acme.Human']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });
    });

    describe('visitEnumDeclaration', () => {
        it('should write the class declaration for an enum', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockParticipantDeclaration = sinon.createStubInstance(EnumDeclaration);
            mockParticipantDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockParticipantDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);

            plantUMLvisitor.visitEnumDeclaration(mockParticipantDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(2);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person << (E,grey) >> {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });

        it('should write the class declaration for an enum with a super type', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockParticipantDeclaration = sinon.createStubInstance(EnumDeclaration);
            mockParticipantDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockParticipantDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);
            mockParticipantDeclaration.getSuperType.returns('org.acme.Human');

            plantUMLvisitor.visitEnumDeclaration(mockParticipantDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(3);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person << (E,grey) >> {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);
            param.fileWriter.writeLine.getCall(2).args.should.deep.equal([0, 'org.acme.Person --|> org.acme.Human']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });
    });

    describe('visitParticipantDeclaration', () => {
        it('should write the class declaration for a participant', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockParticipantDeclaration = sinon.createStubInstance(ParticipantDeclaration);
            mockParticipantDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockParticipantDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);

            plantUMLvisitor.visitParticipantDeclaration(mockParticipantDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(2);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person << (P,lightblue) >> {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });

        it('should write the class declaration for a participant with a super type', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockParticipantDeclaration = sinon.createStubInstance(ParticipantDeclaration);
            mockParticipantDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockParticipantDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);
            mockParticipantDeclaration.getSuperType.returns('org.acme.Human');

            plantUMLvisitor.visitParticipantDeclaration(mockParticipantDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(3);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person << (P,lightblue) >> {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);
            param.fileWriter.writeLine.getCall(2).args.should.deep.equal([0, 'org.acme.Person --|> org.acme.Human']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });
    });

    describe('visitTransactionDeclaration', () => {
        it('should write the class declaration for a transaction', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockTransDeclaration = sinon.createStubInstance(TransactionDeclaration);
            mockTransDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockTransDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);

            plantUMLvisitor.visitTransactionDeclaration(mockTransDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(2);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person << (T,yellow) >> {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });

        it('should write the class declaration for a transaction with a super type', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockTransDeclaration = sinon.createStubInstance(TransactionDeclaration);
            mockTransDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockTransDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);
            mockTransDeclaration.getSuperType.returns('org.acme.Human');

            plantUMLvisitor.visitTransactionDeclaration(mockTransDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(3);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person << (T,yellow) >> {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);
            param.fileWriter.writeLine.getCall(2).args.should.deep.equal([0, 'org.acme.Person --|> org.acme.Human']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });
    });

    describe('visitClassDeclaration', () => {
        it('should write the class declaration for a class', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockClassDeclaration = sinon.createStubInstance(ClassDeclaration);
            mockClassDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockClassDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);

            plantUMLvisitor.visitClassDeclaration(mockClassDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(2);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });

        it('should write the class declaration for a class with a super type', () => {
            let acceptSpy = sinon.spy();

            let param = {
                fileWriter: mockFileWriter
            };

            let mockClassDeclaration = sinon.createStubInstance(ClassDeclaration);
            mockClassDeclaration.getFullyQualifiedName.returns('org.acme.Person');
            mockClassDeclaration.getOwnProperties.returns([{
                accept: acceptSpy
            },
            {
                accept: acceptSpy
            }]);
            mockClassDeclaration.getSuperType.returns('org.acme.Human');

            plantUMLvisitor.visitClassDeclaration(mockClassDeclaration, param);

            param.fileWriter.writeLine.callCount.should.deep.equal(3);
            param.fileWriter.writeLine.getCall(0).args.should.deep.equal([0, 'class org.acme.Person {']);
            param.fileWriter.writeLine.getCall(1).args.should.deep.equal([0, '}']);
            param.fileWriter.writeLine.getCall(2).args.should.deep.equal([0, 'org.acme.Person --|> org.acme.Human']);

            acceptSpy.withArgs(plantUMLvisitor, param).calledTwice.should.be.ok;
        });
    });

    describe('visitField', () => {
        it('should write a line for a field', () => {
            let param = {
                fileWriter: mockFileWriter
            };

            let mockField = sinon.createStubInstance(Field);
            mockField.getType.returns('string');
            mockField.getName.returns('Bob');

            plantUMLvisitor.visitField(mockField, param);

            param.fileWriter.writeLine.withArgs(1, '+ string Bob').calledOnce.should.be.ok;
        });

        it('should write a line for a field thats an array', () => {
            let param = {
                fileWriter: mockFileWriter
            };

            let mockField = sinon.createStubInstance(Field);
            mockField.getType.returns('string');
            mockField.getName.returns('Bob');
            mockField.isArray.returns(true);

            plantUMLvisitor.visitField(mockField, param);

            param.fileWriter.writeLine.withArgs(1, '+ string[] Bob').calledOnce.should.be.ok;
        });
    });

    describe('visitEnumValueDeclaration', () => {
        it('should write a line for a enum value', () => {
            let param = {
                fileWriter: mockFileWriter
            };

            let mockEnumValueDecl = sinon.createStubInstance(EnumValueDeclaration);
            mockEnumValueDecl.getName.returns('Bob');

            plantUMLvisitor.visitEnumValueDeclaration(mockEnumValueDecl, param);

            param.fileWriter.writeLine.withArgs(1, '+ Bob').calledOnce.should.be.ok;
        });
    });

    describe('visitRelationship', () => {
        it('should write a line for a relationship', () => {
            let param = {
                fileWriter: mockFileWriter
            };

            let mockRelationship = sinon.createStubInstance(RelationshipDeclaration);
            mockRelationship.getType.returns('string');
            mockRelationship.getName.returns('Bob');

            plantUMLvisitor.visitRelationship(mockRelationship, param);

            param.fileWriter.writeLine.withArgs(1, '+ string Bob');
        });

        it('should write a line for a relationship thats an array', () => {
            let param = {
                fileWriter: mockFileWriter
            };

            let mockRelationship = sinon.createStubInstance(RelationshipDeclaration);
            mockRelationship.getType.returns('string');
            mockRelationship.getName.returns('Bob');
            mockRelationship.isArray.returns(true);

            plantUMLvisitor.visitRelationship(mockRelationship, param);

            param.fileWriter.writeLine.withArgs(1, '+ string Bob');
        });
    });
});