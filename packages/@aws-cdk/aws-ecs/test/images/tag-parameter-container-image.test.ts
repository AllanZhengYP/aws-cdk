import { Match, Template } from '@aws-cdk/assertions';
import * as ecr from '@aws-cdk/aws-ecr';
import * as cdk from '@aws-cdk/core';
import * as ecs from '../../lib';

describe('tag parameter container image', () => {
  describe('TagParameter container image', () => {
    test('throws an error when tagParameterName() is used without binding the image', () => {
      // GIVEN
      const stack = new cdk.Stack();
      const repository = new ecr.Repository(stack, 'Repository');
      const tagParameterContainerImage = new ecs.TagParameterContainerImage(repository);
      new cdk.CfnOutput(stack, 'Output', {
        value: tagParameterContainerImage.tagParameterName,
      });

      expect(() => {
        Template.fromStack(stack);
      }).toThrow(/TagParameterContainerImage must be used in a container definition when using tagParameterName/);
    });

    test('throws an error when tagParameterValue() is used without binding the image', () => {
      // GIVEN
      const stack = new cdk.Stack();
      const repository = new ecr.Repository(stack, 'Repository');
      const tagParameterContainerImage = new ecs.TagParameterContainerImage(repository);
      new cdk.CfnOutput(stack, 'Output', {
        value: tagParameterContainerImage.tagParameterValue,
      });

      expect(() => {
        Template.fromStack(stack);
      }).toThrow(/TagParameterContainerImage must be used in a container definition when using tagParameterValue/);
    });

    test('can be used in a cross-account manner', () => {
      // GIVEN
      const app = new cdk.App();
      const pipelineStack = new cdk.Stack(app, 'PipelineStack', {
        env: {
          account: 'pipeline-account',
          region: 'us-west-1',
        },
      });
      const repositoryName = 'my-ecr-repo';
      const repository = new ecr.Repository(pipelineStack, 'Repository', {
        repositoryName: repositoryName,
      });
      const tagParameterContainerImage = new ecs.TagParameterContainerImage(repository);

      const serviceStack = new cdk.Stack(app, 'ServiceStack', {
        env: {
          account: 'service-account',
          region: 'us-west-1',
        },
      });
      const fargateTaskDefinition = new ecs.FargateTaskDefinition(serviceStack, 'ServiceTaskDefinition');

      // WHEN
      fargateTaskDefinition.addContainer('Container', {
        image: tagParameterContainerImage,
      });

      // THEN
      Template.fromStack(pipelineStack).hasResourceProperties('AWS::ECR::Repository', {
        RepositoryName: repositoryName,
        RepositoryPolicyText: {
          Statement: [{
            Action: [
              'ecr:BatchCheckLayerAvailability',
              'ecr:GetDownloadUrlForLayer',
              'ecr:BatchGetImage',
            ],
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::Join': ['', [
                  'arn:',
                  { Ref: 'AWS::Partition' },
                  ':iam::service-account:role/servicestackionexecutionrolee7e2d9a783a54eb795f4',
                ]],
              },
            },
          }],
        },
      });
      Template.fromStack(serviceStack).hasResourceProperties('AWS::IAM::Role', {
        RoleName: 'servicestackionexecutionrolee7e2d9a783a54eb795f4',
      });
      Template.fromStack(serviceStack).hasResourceProperties('AWS::ECS::TaskDefinition', {
        ContainerDefinitions: [
          Match.objectLike({
            Image: {
              'Fn::Join': ['', [
                {
                  'Fn::Select': [4, {
                    'Fn::Split': [':', {
                      'Fn::Join': ['', [
                        'arn:',
                        { Ref: 'AWS::Partition' },
                        `:ecr:us-west-1:pipeline-account:repository/${repositoryName}`,
                      ]],
                    }],
                  }],
                },
                '.dkr.ecr.',
                {
                  'Fn::Select': [3, {
                    'Fn::Split': [':', {
                      'Fn::Join': ['', [
                        'arn:',
                        { Ref: 'AWS::Partition' },
                        `:ecr:us-west-1:pipeline-account:repository/${repositoryName}`,
                      ]],
                    }],
                  }],
                },
                '.',
                { Ref: 'AWS::URLSuffix' },
                `/${repositoryName}:`,
                { Ref: 'ServiceTaskDefinitionContainerImageTagParamCEC9D0BA' },
              ]],
            },
          }),
        ],
      });
    });
  });
});
