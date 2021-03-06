# Generated by Django 4.0.4 on 2022-05-25 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0015_alter_student_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='active',
            field=models.CharField(choices=[('1', 'Active'), ('0', 'Inactive')], default='1', max_length=10),
        ),
        migrations.AlterField(
            model_name='student',
            name='department',
            field=models.CharField(choices=[('0', 'General'), ('1', 'AI'), ('2', 'CS'), ('3', 'IS'), ('4', 'IT'), ('5', 'DS')], default='0', max_length=10),
        ),
        migrations.AlterField(
            model_name='student',
            name='status',
            field=models.CharField(choices=[('1', 'Male'), ('0', 'Female')], default='1', max_length=10),
        ),
    ]
