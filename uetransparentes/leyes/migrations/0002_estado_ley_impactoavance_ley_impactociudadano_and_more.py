# Generated by Django 5.1.7 on 2025-03-18 00:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leyes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado', models.CharField(max_length=255, unique=True, verbose_name='Estado')),
            ],
        ),
        migrations.AddField(
            model_name='ley',
            name='impactoavance',
            field=models.TextField(blank=True, null=True, verbose_name='Impacto'),
        ),
        migrations.AddField(
            model_name='ley',
            name='impactociudadano',
            field=models.TextField(blank=True, null=True, verbose_name='Impacto ciudadanía'),
        ),
        migrations.AddField(
            model_name='ley',
            name='impactocivilong',
            field=models.TextField(blank=True, null=True, verbose_name='Impacto orgs sociedad civil'),
        ),
        migrations.AddField(
            model_name='ley',
            name='tipo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='leyes.tipo'),
        ),
        migrations.AlterField(
            model_name='ley',
            name='autores',
            field=models.TextField(blank=True, null=True, verbose_name='Autores'),
        ),
        migrations.AlterField(
            model_name='ley',
            name='avanceley',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='leyes.avance'),
        ),
        migrations.AlterField(
            model_name='ley',
            name='boletin',
            field=models.ManyToManyField(blank=True, null=True, related_name='boletin', to='leyes.anexo'),
        ),
        migrations.AlterField(
            model_name='ley',
            name='descripcion',
            field=models.TextField(blank=True, null=True, verbose_name='Descripción'),
        ),
        migrations.AlterField(
            model_name='ley',
            name='enlace',
            field=models.URLField(blank=True, null=True, verbose_name='Enlace'),
        ),
        migrations.AlterField(
            model_name='ley',
            name='fecha',
            field=models.DateField(blank=True, null=True, verbose_name='Fecha'),
        ),
        migrations.AlterField(
            model_name='ley',
            name='ley',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Texto Ley'),
        ),
        migrations.AlterField(
            model_name='ley',
            name='minuta',
            field=models.ManyToManyField(blank=True, null=True, related_name='minuta', to='leyes.anexo'),
        ),
        migrations.AddField(
            model_name='ley',
            name='estado',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='leyes.estado'),
        ),
    ]
