# Generated by Django 5.0.3 on 2024-07-14 01:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("isfsite", "0002_alter_quant_firm"),
    ]

    operations = [
        migrations.AlterField(
            model_name="firm",
            name="currency",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="isfsite.currency",
            ),
        ),
        migrations.AlterField(
            model_name="firm",
            name="industry",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="isfsite.industry",
            ),
        ),
        migrations.AlterField(
            model_name="firm",
            name="sector",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="isfsite.sector",
            ),
        ),
        migrations.AlterField(
            model_name="firm",
            name="subindustry",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="isfsite.subindustry",
            ),
        ),
        migrations.AlterField(
            model_name="firm",
            name="subsector",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="isfsite.subsector",
            ),
        ),
    ]
