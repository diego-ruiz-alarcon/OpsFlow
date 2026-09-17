// ========================================
// CONFIGURACIÓN GENERAL
// ========================================

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

const BASE_OPERATION_PROGRESS = 68;


// ========================================
// 01. ACTUALIZACIÓN DE ESTADO
// ========================================

qs('#actualizarEstado').addEventListener('click', () => {

  const ahora = new Date();

  const hora = ahora.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit'
  });

  qs('#mensajeOperacion').textContent =
    `Estado actualizado: operación revisada correctamente a las ${hora}.`;

});


// ========================================
// 02. CAMBIO DE ESTADO VISUAL
// ========================================

qsa('.priority-button').forEach((button) => {

  button.addEventListener('click', () => {

    const urgente =
      button.dataset.priority === 'normal';

    button.dataset.priority =
      urgente ? 'urgent' : 'normal';

    button.textContent =
      urgente
        ? '★ Prioridad urgente'
        : '☆ Marcar urgente';

    button.classList.toggle(
      'is-urgent',
      urgente
    );

    qs('#prioridadMensaje').textContent =
      urgente
        ? '✓ Servicio agregado a la lista prioritaria.'
        : 'Servicio retirado de la lista prioritaria.';

  });

});


// ========================================
// 03. CONTADOR OPERATIVO
// ========================================

const updateTasks = () => {

  const tasks = qsa('.task');

  const completed = tasks.filter(
    (task) =>
      task.querySelector('input').checked
  ).length;

  qs('#tareasTexto').textContent =
    `${completed} de ${tasks.length} completadas`;

  const percentage =
    tasks.length
      ? (completed / tasks.length) * 100
      : 0;

  qs('#tareasBarra').style.width =
    `${percentage}%`;

  tasks.forEach((task) => {

    const checked =
      task.querySelector('input').checked;

    task.classList.toggle(
      'is-complete',
      checked
    );

  });

};

qsa('.task input').forEach((input) => {

  input.addEventListener(
    'change',
    updateTasks
  );

});

updateTasks();


// ========================================
// 04. MOSTRAR / OCULTAR DETALLES
// ========================================

qs('#alternarDetalle').addEventListener(
  'click',
  (event) => {

    const button =
      event.currentTarget;

    const detail =
      qs('#detalleOperacion');

    const isHidden =
      detail.hidden;

    detail.hidden =
      !isHidden;

    button.textContent =
      isHidden
        ? 'Ocultar detalle −'
        : 'Mostrar detalle +';

    button.setAttribute(
      'aria-expanded',
      String(isHidden)
    );

  }
);


// ========================================
// 05. VISTA PREVIA EN TIEMPO REAL
// ========================================

qs('#mensajeEquipo').addEventListener(
  'input',
  (event) => {

    const texto =
      event.target.value.trim();

    qs('#contador').textContent =
      `${event.target.value.length} / 120`;

    qs('#vistaPrevia').textContent =
      texto ||
      'Tu mensaje aparecerá aquí...';

  }
);


qs('#enviarMensaje').addEventListener(
  'click',
  () => {

    const input =
      qs('#mensajeEquipo');

    const status =
      qs('#mensajeEstado');

    if (!input.value.trim()) {

      status.textContent =
        'Escribe un mensaje antes de enviarlo.';

      status.className =
        'form-message is-error';

      input.focus();

      return;
    }

    status.textContent =
      '✓ Mensaje enviado al equipo de distribución.';

    status.className =
      'form-message is-success';

    input.value = '';

    qs('#contador').textContent =
      '0 / 120';

    qs('#vistaPrevia').textContent =
      'Tu mensaje aparecerá aquí...';

  }
);


// ========================================
// 06. SELECCIÓN Y CÁLCULO
// ========================================

const calcularCapacidad = () => {

  const capacidadPorVehiculo =
    Number(
      qs('#tipoVehiculo').value
    );

  const cantidad =
    Math.max(
      1,
      Number(
        qs('#cantidadVehiculos').value
      ) || 1
    );

  const total =
    capacidadPorVehiculo * cantidad;

  qs('#capacidadCalculada').textContent =
    capacidadPorVehiculo
      ? `${total} despachos`
      : '0 despachos';

};


qs('#tipoVehiculo').addEventListener(
  'change',
  calcularCapacidad
);

qs('#cantidadVehiculos').addEventListener(
  'input',
  calcularCapacidad
);

calcularCapacidad();


// ========================================
// 07. RANGO / PROGRESO
// ========================================

const updateCapacity = () => {

  const percentage =
    Number(
      qs('#rangoDisponibilidad').value
    );

  qs('#valorRango').textContent =
    `${percentage}%`;

  qs('#disponibilidad').textContent =
    `${percentage}%`;

  qs('#disponibilidadBarra').style.width =
    `${percentage}%`;

};


qs('#rangoDisponibilidad').addEventListener(
  'input',
  updateCapacity
);

updateCapacity();


// ========================================
// 08. CREAR / ELIMINAR ELEMENTOS
// ========================================

qs('#crearIncidencia08').addEventListener(
  'click',
  () => {

    const lista =
      qs('#elementosCreados08');

    const mensaje =
      qs('#crearMensaje08');

    // Crear el elemento principal
    const elemento =
      document.createElement('div');

    elemento.className =
      'saved-incident';

    // Crear contenido
    const contenido =
      document.createElement('span');

    const titulo =
      document.createElement('strong');

    const detalle =
      document.createElement('small');

    // Crear botón eliminar
    const botonEliminar =
      document.createElement('button');

    titulo.textContent =
      'Nueva incidencia';

    detalle.textContent =
      'Incidencia creada correctamente.';

    botonEliminar.type =
      'button';

    botonEliminar.textContent =
      'Eliminar';

    contenido.append(
      titulo,
      detalle
    );

    elemento.append(
      contenido,
      botonEliminar
    );

    // Agregar la incidencia a la lista
    lista.prepend(elemento);

    mensaje.textContent =
      '✓ Incidencia agregada a la lista.';

    mensaje.className =
      'form-message is-success';

    // Eliminar la incidencia
    botonEliminar.addEventListener(
      'click',
      () => {

        elemento.remove();

        mensaje.textContent =
          '✓ Incidencia eliminada de la lista.';

      }
    );

  }
);


// ========================================
// 09. FILTRADO
// ========================================

qsa('.filter').forEach((button) => {

  button.addEventListener('click', () => {

    // Cambiar botón seleccionado
    qsa('.filter').forEach((item) => {

      item.classList.remove(
        'is-selected'
      );

    });

    button.classList.add(
      'is-selected'
    );

    // Obtener filtro elegido
    const filter =
      button.dataset.filter;

    // Mostrar u ocultar despachos
    qsa('.dispatch').forEach(
      (dispatch) => {

        const mostrar =
          filter === 'todos' ||
          dispatch.dataset.status === filter;

        dispatch.hidden =
          !mostrar;

      }
    );

  });

});


// ========================================
// 10. FORMULARIO CON VALIDACIÓN
// ========================================

// Actualizar impacto visual de la severidad
qs('#severidadIncidencia').addEventListener(
  'change',
  (event) => {

    const impacto =
      Number(event.target.value);

    qs('#impactoCalculado').textContent =
      impacto
        ? `-${impacto}%`
        : '0%';

  }
);


// Actualizar progreso general de la operación
const updateOperationProgress = () => {

  const impact =
    qsa('.saved-incident')
      .reduce(
        (total, incident) =>
          total +
          Number(
            incident.dataset.impact || 0
          ),
        0
      );

  const progress =
    Math.max(
      0,
      BASE_OPERATION_PROGRESS - impact
    );

  qs('#progresoTexto').textContent =
    `${progress}%`;

  qs('#progresoBarra').style.width =
    `${progress}%`;

  qs('#progresoBarra').classList.toggle(
    'progress__bar--critical',
    progress <= 50
  );

};


// Validar y registrar el formulario
qs('#incidenciaForm').addEventListener(
  'submit',
  (event) => {

    event.preventDefault();

    const type =
      qs('#tipoIncidencia').value;

    const severity =
      qs('#severidadIncidencia').value;

    const detail =
      qs('#detalleIncidencia')
        .value
        .trim();

    const message =
      qs('#incidenciaMensaje');


    // Validación de campos obligatorios
    if (!type || !severity || !detail) {

      message.textContent =
        'Completa el tipo, la severidad y el detalle de la incidencia.';

      message.className =
        'form-message is-error';

      return;
    }


    // Obtener impacto
    const impact =
      Number(severity);

    const severityLabel =
      impact >= 18
        ? 'Grave'
        : 'Moderada';


    // Mostrar confirmación
    message.textContent =
      `✓ Incidencia “${type}” registrada. La operación baja ${impact} puntos.`;

    message.className =
      'form-message is-success';


    // Crear nueva incidencia
    const incident =
      document.createElement('div');

    incident.className =
      'saved-incident';

    incident.dataset.impact =
      String(impact);


    // Crear contenido
    const incidentContent =
      document.createElement('span');

    const incidentType =
      document.createElement('strong');

    const incidentDetail =
      document.createElement('small');

    const removeButton =
      document.createElement('button');


    incidentType.textContent =
      type;

    incidentDetail.textContent =
      `${severityLabel} · ${detail}`;

    removeButton.type =
      'button';

    removeButton.textContent =
      'Resolver';


    incidentContent.append(
      incidentType,
      incidentDetail
    );

    incident.append(
      incidentContent,
      removeButton
    );


    // Resolver incidencia
    removeButton.addEventListener(
      'click',
      () => {

        incident.remove();

        updateOperationProgress();

        const updatedAlerts =
          Math.max(
            0,
            Number(
              qs('#alertasTotal').textContent
            ) - 1
          );

        qs('#alertasTotal').textContent =
          updatedAlerts;

        // Actualizar también el resumen
        qs('#resumenAlertas').textContent =
          updatedAlerts;

      }
    );


    // Agregar incidencia a la lista
    qs('#incidenciasRegistradas')
      .prepend(incident);


    // Actualizar progreso
    updateOperationProgress();


    // Actualizar contador de alertas
    const alerts =
      Number(
        qs('#alertasTotal').textContent
      ) + 1;

    qs('#alertasTotal').textContent =
      alerts;

    qs('#resumenAlertas').textContent =
      alerts;


    // Limpiar formulario
    qs('#incidenciaForm').reset();

    qs('#impactoCalculado').textContent =
      '0%';

  }
);