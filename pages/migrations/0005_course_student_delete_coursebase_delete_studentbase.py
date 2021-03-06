# Generated by Django 4.0.4 on 2022-05-24 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_rename_coursedays_coursebase_course_days'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('name', models.CharField(max_length=55, unique=True)),
                ('code', models.CharField(max_length=55, primary_key=True, serialize=False)),
                ('days', models.IntegerField()),
                ('department', models.CharField(max_length=55)),
                ('hours', models.IntegerField()),
                ('hall', models.CharField(max_length=55)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('name', models.CharField(max_length=55)),
                ('id', models.CharField(max_length=55, primary_key=True, serialize=False)),
                ('birthday', models.DateField()),
                ('university', models.CharField(max_length=55)),
                ('department', models.CharField(max_length=55)),
                ('course1', models.CharField(max_length=55)),
                ('course2', models.CharField(max_length=55)),
                ('course3', models.CharField(max_length=55)),
                ('active', models.BooleanField()),
                ('status', models.BooleanField()),
            ],
        ),
        migrations.DeleteModel(
            name='CourseBase',
        ),
        migrations.DeleteModel(
            name='StudentBase',
        ),
    ]
